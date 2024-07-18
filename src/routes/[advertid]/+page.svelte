<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Carousel, Button, Thumbnails } from 'flowbite-svelte';
    import { Video } from 'flowbite-svelte';
    import { Gallery } from 'flowbite-svelte';
    import Contact from "../Contact.svelte";

    // Carousel controls:
    let index = 0;
    let forward = true;

    const advertId = $page.params.advertid;
    console.log(advertId);

    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = prodUrl;

    // Urls for development and production databases:
    const prodColl = import.meta.env.VITE_PROD_COLL;
    const devColl = import.meta.env.VITE_DEV_COLL;
    const currColl = devColl;

    // Cloudflare variables:
    const CLOUDFLARE_ACCOUNT_ID = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
    const CLOUDFLARE_API_TOKEN = import.meta.env.VITE_CLOUDFLARE_API;
    const CLOUDFLARE_CUSTOMER_CODE = import.meta.env.VITE_CLOUDFLARE_CUSTOMER_CODE

    let advert = []

    let ready = false;

    async function getData(id) {
        try {
            console.log(id);
            let coll = "advert_info";
            coll = currColl + coll;
            const url = currUrl + "read/" + coll + "/" + id;
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            let resData = await res.json();

            advert = resData;
            ready = true;
            console.log(resData);

        } catch (error) {
            console.log("Error retrieving info: " + error);
        }
    }

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
    
    let logo;

    async function getLogo() {
        const url = currUrl + "read/" + "Logo" + "/logo";
        const res = await fetch(url);
        const resData = await res.json();
        logo = resData["src"];
        console.log(logo);
    }

    onMount(() => {
        getData(advertId);
        getSubColl(advertId, "Payment");
        getSubColl(advertId, "Videos");
        getSubColl(advertId, "Images");
        getLogo();
    })

</script>

<style>
    .moreinfowrapper {
        min-height: 100vh;
    }

    .imgcontainer {
        margin: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .backtohome {
        color: black;
    }

    .logowrapper {
        border-radius: 15px;
    }
</style>

<svelte:head>
    <title>DroneWorks | {advertId}</title>
</svelte:head>

<div class="moreinfowrapper bg-gray-200">

    <Button class="bg-gray-200 hover:bg-gray-300"><a class="backtohome" href="/">Back to home</a></Button>

    {#if ready}

        <section class="bg-gray-200">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">{advert.title}</h1>
                    <p class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-900">{advert.info}</p>
                </div>
                <div class="hidden logowrapper lg:mt-1 lg:col-span-5 lg:flex">
                    <img src={logo} alt="mockup">
                </div>   
                
                {#each payment as item}

                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-2xl text-gray-900">{item.id}</h1>
                        <p class="max-w-xl mb-6 font-light lg:mb-8 md:text-m lg:text-xl text-gray-900">{item.info}</p>
                    </div>

                {/each}

            </div>

            <div class="vidcontainer">
<!-- 
                {#each videos as vid}

                    <iframe
                        title="ok"
                        src={vid.vid_url}
                        style="border: none"
                        height="100"
                        width="150"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowfullscreen="true"
                        id="stream-player"
                    ></iframe>

                {/each} -->

            
            </div>

            <div class="imgcontainer">
                <Gallery items={images} class="gap-4 grid-cols-2 md:grid-cols-3" />
                <!-- <div class="max-w-4xl space-y-4">
                    <Carousel {images} {forward} let:Indicators let:Controls bind:index>
                      <Controls />
                      <Indicators />
                    </Carousel>
                    <Thumbnails {images} {forward} bind:index />
                  </div> -->
            </div>

            <Contact></Contact>

        </section>

    {:else}

    <center>
        <div class="flex items-center justify-center w-506 h-506 border rounded-lg bg-gray-800 border-gray-700">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center rounded-full animate-pulse bg-blue-900 text-blue-200">Loading...</div>
        </div>
    </center>


    {/if}


    <!-- From cloudflare: -->
    <!-- You can use styles and CSS on this iframe element where the video player will appear -->
   

    <!-- <script src="https://embed.cloudflarestream.com/embed/sdk.latest.js"></script> -->

    <!-- Your JavaScript code below-->
    <!-- <script>
        const player = Stream(document.getElementById('stream-player'));
        player.addEventListener('play', () => {
            console.log('playing!');
        });
        player.play().catch(() => {
            console.log('playback failed, muting to try again');
            player.muted = true;
            player.play();
        });
    </script> -->

</div>
