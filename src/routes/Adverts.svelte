<script>
    import { onMount } from "svelte";

    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = devUrl;

    // Urls for development and production databases:
    const prodColl = import.meta.env.VITE_PROD_COLL;
    const devColl = import.meta.env.VITE_DEV_COLL;
    const currColl = prodColl;

    let adverts = []

    async function testAPI() {
        try {
            const coll = currColl + "advert_info";
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
            if (coll.localeCompare(currColl + "article_info") === 0) { articles = resData; console.log(articles); }
            else if (coll.localeCompare(currColl + "advert_info") === 0) { adverts = resData; console.log(adverts); }

        } catch (error) {
            console.log("Error retrieving info: " + error);
        }
    }

    onMount(() => {
        testAPI();
        console.log(adverts);
    })

</script>

<style>
    /* .advertcontainer {
        border: 1px solid red;
    } */

    .advert {
        /* border: 1px solid white; */
        box-shadow: 5px 5px 10px rgb(67, 111, 255);
        cursor: pointer;
        border-radius: 5px;
        margin: 1rem;
        padding: 1rem;
    }

    .advert:hover {
        /* transform: scale(1.01); */
        box-shadow: 5px 5px 15px rgb(92, 152, 255);
        transform: scale(1.01);
        /* box-sizing: border-box; */
    }

</style>

<section class="bg-gray-200">
    <div class="advertcontainer py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <!-- <center><h1 class="text-gray-900">What we do</h1></center> -->
        <div class="max-w-screen-md mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Making your aerial dreams come true!</h2>
            <p class="sm:text-xl text-gray-800">DroneWorks emphasizes your needs, ensuring that whatever project we're working on is finished only when you say it is.</p>
            <p class="sm:text-xl text-gray-800">
                Check out previous examples of our work below!
            </p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">

            {#each adverts as advert}

            <div class="advert bg-gray-800">
                <a href="/{advert.id}">
                    <div>
                        <!-- <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                            <svg class="w-5 h-5 lg:w-6 lg:h-6 text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        </div> -->
                        <h3 class="mb-4 text-xl font-bold text-white">{advert.title}</h3>
                        <p class="text-gray-300">{advert.info}</p>
                    </div>
                </a>

            </div>


            {/each}
        </div>
    </div>
  </section>