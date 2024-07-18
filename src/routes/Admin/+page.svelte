<script>
    import { onMount } from "svelte";
    import { Label, Fileupload, P } from 'flowbite-svelte';
    import { Spinner } from 'flowbite-svelte';

    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = prodUrl;

    // Urls for development and production databases:
    const prodColl = import.meta.env.VITE_PROD_COLL;
    const devColl = import.meta.env.VITE_DEV_COLL;
    const currColl = devColl;

    let showSpinner = false;

    // Retrieve & send images / videos:

    let selectedFile;

    let currFile = "nothing";

    async function sendMedia(file) {
        // You can't send form data and json data in the same (post) request.

        const doc = id;
        console.log("Sent media: " + file + "\nDoc/ID: " + doc);
    
        // Send media:
        const formData = new FormData()
        formData.append("file", selectedFile);

        const url = currUrl + "uploadfile/";

        try {
            showSpinner = true;
            const res = await fetch(url, {
                method: "POST",
                body: formData
            });

            showSpinner = false;

            // Get response:
            const resData = await res.json();
            const status = resData["status"];
            const fileName = resData["filename"];
            currFile = fileName;
            console.log(currFile);
            console.log("Status: " + status);
        } catch (error) {
            showSpinner = false;
            console.log("Media sending didn't work! Error: " + error);
        }
    }

    let currImg = "gs://droneworks-14880.appspot.com/";

    async function getMedia(id) {
        const collectio_n = currColl + collection + "_info";
        try {
            const url = currUrl + "/getimg/" + collectio_n + "/" + id;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }

            let resData = await res.json();

            const image = resData["img"];
            console.log("Found img: " + image);
            currImg = currImg + image;
        } catch (error) {
            console.log("Error retrieving image: ", error);
            return "";
        }
    }

    const handleFileChange = (event) => {
        selectedFile = event.target.files[0];
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMedia();
    };

    // Retrieve & send articles & adverts:

    let articles = []
    let adverts = []

    async function testAPI(coll) {
        try {
            coll = currColl + coll;
            const url = currUrl + "read/" + coll;
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            let resData = await res.json();

            // console.log("Before: " + resData);

            // JSON.parse turns the json string into a JavaScript array
            resData = JSON.parse(resData);

            // console.log(resData[0]["title"]);
            if (coll.localeCompare(currColl + "article_info") === 0) { 
                articles = resData; 
                console.log(articles); 
            }
            else if (coll.localeCompare(currColl + "advert_info") === 0) { 
                adverts = resData; 
                console.log(adverts);
                for (let i = 0; i < adverts.length; i++) {
                    const payInfo = getSubColl(adverts[i]["id"], "Payment");
                    console.log(payInfo);
                }
            }

        } catch (error) {
            console.log("Error retrieving info: " + error);
        }
    }

    // Show and close modals:

    // Show modal:

    let id;
    let collection = "nothing";

    function showEditModal(changeID, collectio_n) {
        if (changeID.localeCompare("create") == 0) {
            const editModal = document.querySelector(".createmodal");
            editModal.show();
            id = changeID;
            collection = currColl + collectio_n;
            console.log("changeID: " + id + "\ncollection: " + collection);
        } else {
            const editModal = document.querySelector(".editmodal");
            editModal.show();
            id = changeID;
            collection = collectio_n;
            console.log("changeID: " + id + "\ncollection: " + collection);
        }

        // collectio_n = currColl + collectio_n + "_info";

        console.log(collectio_n);

        getData(id, collectio_n);
    }
    
    // Close modal:

    function closeSomeModal(type) {
        const modal = document.querySelector("." + type + "modal");
        console.log("Close: " + modal);
        modal.close();
    }

    let status;
    let newTitle;
    let newInfo;
    let newImg;

    async function editArticle(title, info, img) {

        img = currFile;
        const collectio_n = collection

        console.log(collectio_n);

        console.log("Update to selected file: " + img);

        console.log(id);

        const article = {
            collection: collectio_n,
            id: id,
            title: title,
            info: info,
            img_url: img
        }

        console.log(article);

        try {
            showSpinner = true;
            const url = currUrl + "update/";
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(article)
            });
            showSpinner = false;
            const resData = await res.json();
            status = resData["status"];
            newTitle = resData["new_title"];
            newInfo = resData["new_info"];
            newImg = resData["new_img"];
            
            console.log("Status: " + status + "\nNew Title: " + newTitle + "\nNew Info: " + newInfo + "\nNew Img: " + newImg);
        } catch (error) {
            showSpinner = false;
            console.log("Error updating info: " + error);
        }

    }

    async function deleteArticle(coll, id) {
        try {
            showSpinner = true;
            const collectio_n = coll;
            const url = currUrl + "delete/" + collectio_n + "/" + id;
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work :(")
            }
            showSpinner = false;
            const resData = await res.json();
            const status = resData["status"];
            console.log("Deletion status: " + status);
        } catch (error) {
            showSpinner = false;
            console.log("Error deleting article: " + error);
        }

    }

    async function createArticle(title, info) {

        const collectio_n = collection + "_info";
        console.log(collectio_n);
        id = title;

        const article  = {
            collectio_n,
            id,
            title,
            info
        }

        console.log(article);

        try {
            showSpinner = true;
            const url = currUrl + "create/";
            console.log(url);
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(article)
            });
            showSpinner = false;
            const resData = await res.json();
            const status = resData["status"];
            const newTitle = resData["new_title"];
            const newInfo = resData["new_info"];
        } catch (error) {
            showSpinner = false;
            console.log("Error creating article: " + error);
        }

    }

    let info;
    let title;
    let img;

    // Gets the data to fill in the forms automatically.

    async function getData(id, collecti_on) {
        try {
            const collectio_n = collecti_on;
            console.log(collecti_on);
            console.log(id);
            const url = currUrl + "read/" + collectio_n + "/" + id;
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work :(");
            }
            const resData = await res.json();
            console.log(resData);
            title = resData["title"];
            info = resData["info"];
            console.log("title: " + title + "\nInfo: " + info);
            console.log(resData);
            return resData;
        } catch (error) {
            console.log("Error getting data: " + error);
            return -1;
        }
    }

    // Get images:

    let allImageUrls = [];

    async function getAllImages() {
        try {
            const url = currUrl + "allimages";
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Couldn't get all images :(");
            }
            let resData = await res.json();
            resData = JSON.parse(resData);
            allImageUrls = resData;
            console.log(allImageUrls);
        } catch (error) {
            console.log("Couldn't retrieve all images: " + error);
        }
    }

    let singleImg;

    async function getSingleImage(id) {
        try {
            const collectio_n = currColl + collection + "_info";
            const url = currUrl + "getimg/" + collectio_n + "/" + id;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Couldn't get single image :(");
            }
            let resData = await res.json();
            singleImg = resData["img_url"];
            if (singleImg.localeCompare("") === 0) {
                return ""; 
            }
            console.log(singleImg);
            
            return singleImg;
        } catch (error) {
            console.log("Couldn't retrieve single image: " + error);
        }
    }

    // Get all sub-collections

    let payment = [];
    let videos = [];
    let images = [];

    async function getSubColl(id, subColl) {
        try {
            let coll = "advert_info";
            coll = currColl + coll;
            const url = currUrl + "read/" + coll + "/" + id + "/" + subColl;
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            let resData = await res.json();

            resData = JSON.parse(resData);

            if (subColl.localeCompare("Payment") === 0) {
                payment = resData;
                ready = true;
                console.log(payment);
            } else if (subColl.localeCompare("Videos") === 0) {
                videos = resData;
                console.log(videos);
                ready = true;
            } else if (subColl.localeCompare("Images") === 0) {
                images = resData;
                console.log(images);
                ready = true;
            }

        } catch (error) {
            console.log("Error retrieving info: " + error);
        }
    }

    let passCheck = false;

    function checkPass(pass) {
        const password = import.meta.env.VITE_ADMIN_PASSWORD;
        if (pass.localeCompare(password) === 0) {
            passCheck = true;
        }
    }

    let currLink = "";
    const CLOUDFLARE_ACCOUNT_HASH = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_HASH;

    function generateLink(id) {
        // https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
        currLink = "https://imagedelivery.net/" + CLOUDFLARE_ACCOUNT_HASH + "/" + id + "/public";
    }

    onMount(() => {
        testAPI("article_info");
        testAPI("advert_info");
        // getSubColl()
        // getAllImages();
        // getSingleImage(article.id)
    } );


</script>

<style>

 .imgwrapper {
    max-width: 30vh;
 }

 h1 { color: white; }

 .passwordwrapper {
    border: 5px solid white;
    width: 100%;
    height: 100vh;
    color: white;
 }

 .passinput {
    color: black;
 }

</style>

<div class="wrapper bg-gray-900">

{#if passCheck == false}

    <div class="passwordwrapper">
        <form on:submit={() => {
            const tryPass = document.querySelector(".passinput").value;
            checkPass(tryPass);
        }}>
            <label for="adminpass">Password</label>
            <input class="passinput" type="text" name="adminpass" required>
            <input type="submit">
        </form>
    </div>

{:else}

    <section>

        <!-- Edit Modal: -->

        <dialog class="editmodal">
            <div class="editmodalwrapper">
                <div class="closemodalwrapper">
                    <button on:click={() => {
                        closeSomeModal("edit");
                    }} class="closemodalbutton">Close X</button>
                </div>
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit {title}</h2>
                        <form action="/Admin" on:submit={() => {
                                try {
                                    const title = document.querySelector("#title").value;
                                    const info = document.querySelector("#info").value;
                                    const img = "";
                                    editArticle(title, info, img);
                                    console.log("Sent");
                                } catch (error) {
                                    console.log("Couldn't find or send data. Try agin :( " + error);
                                }
                            }}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Title</label>
                                    <input type="text" name="name" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" value={title}>
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Info</label>
                                    <textarea id="info" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" value={info}></textarea>
                                </div>
                            </div>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <form on:submit|preventDefault={handleSubmit} class="sendfile">
                                    <input on:change={handleFileChange} type="file" id="fileupload" name="fileupload" required value="">
                                    <input type="submit" value="Upload">
                                </form>
                            </div>
                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Update {#if showSpinner}<Spinner></Spinner>{/if}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </dialog>

        <!-- Create Modal: -->

        <dialog class="createmodal">
            <div class="createmodalwrapper">
                <div class="closemodalwrapper">
                    <button on:click={() => {
                        closeSomeModal("create");
                    }} class="closemodalbutton">Close X</button>
                </div>
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create {collection}</h2>
                        <form action="/Admin" on:submit={() => {
                                try {
                                    const title = document.querySelector("#createtitle").value;
                                    const info = document.querySelector("#createinfo").value;
                                    createArticle(title, info);
                                    console.log("Sent: \nTitle: " + title + "\nInfo: " + info);
                                } catch (error) {
                                    console.log("Couldn't send data. Try agin :( " + error);
                                }
                            }}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" name="name" id="createtitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
                                    <textarea id="createinfo" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Create {#if showSpinner}<Spinner></Spinner>{/if}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </dialog>

        <br><br>

        <center><h1>Articles</h1></center>

        {#each articles as article}
            
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-2 text-xl font-semibold leading-none md:text-2xl text-white">{article["title"]}</h2>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-white">Details</dt>
                    <dd class="mb-4 font-light text-gray-400">{article["info"]}</dd>
                </dl>
                <img src={article["img_src"]} alt="okimagesource">
                <div class="flex items-center space-x-4">
                    <button on:click={() => showEditModal(article.id, article.collection) } type="button" id="editmodalbutton" class="editmodalbutton text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Edit
                    </button>   
                    <button on:click={() => deleteArticle(article.collection, article.id)} type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 text-center">
                        Delete
                    </button> 
                </div>

                <div class="imgwrapper">
                </div>

            </div>

        {/each}

        <center><h1>Adverts</h1></center>

        {#each adverts as advert}
            
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-2 text-xl font-semibold leading-none md:text-2xl text-white">{advert["title"]}</h2>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-white">Details</dt>
                    <dd class="mb-4 font-light text-gray-400">{advert["info"]}</dd>
                </dl>
                <div class="flex items-center space-x-4">
                    <button on:click={() => showEditModal(advert.id, advert.collection) } type="button" id="editmodalbutton" class="editmodalbutton text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Edit
                    </button>   
                    <button on:click={() => deleteArticle(advert.collection, advert.id)} type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 text-center">
                        Delete
                    </button> 
                </div>

                <div class="imgwrapper">
                </div>
            </div>

        {/each}

        <button on:click={() => showEditModal("create", "article")} type="button" class="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 rounded-lg text-sm px-5 py-2.5 text-center">
            Create article 
        </button>
        <button on:click={() => showEditModal("create", "advert")} type="button" class="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 rounded-lg text-sm px-5 py-2.5 text-center">
            Create advert 
        </button>
        <form on:submit={() => {
            const imgid = document.querySelector("#genlink").value;
            generateLink(imgid);
        }}>
            <label for="genlink" class="text-white">Generate image link</label>
            <input type="text" name="genlink" id="genlink" required>
            <input type="submit" value="Generate" class="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 rounded-lg text-sm px-5 py-2.5 text-center">
        </form>
        <p class="text-white">
            Current link: {currLink}
        </p>
        <br><br><br>
            
    </section>

{/if}



  <br><br><br>

</div>
