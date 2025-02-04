<script>
    import { onMount } from 'svelte';
    import { Gallery } from 'flowbite-svelte';
    import { writable } from 'svelte/store' 

    let loading = writable(true);
    let isReady = writable(false);

    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = devUrl;

    let abstractImgs = []

    // async function fetchSpecImg() {
    //     try {
    //         console.log("started");
    //         const url = devUrl + "getspecimages/abstract";
    //         const res = await fetch(url);
    //         if (!res.ok) {
    //             throw new Error("API fetching didn't work");
    //         }
    //         const resData = await res.json();

    //         abstractImgs = resData;

    //         // for (let i = 0; i < resData.length; i++) {
    //         //     const temp = {
    //         //         alt: "temp" + i,
    //         //         src: resData[0],
    //         //         id: i
    //         //     }
    //         //     abstractImgs.push(temp);
    //         // }
    //         console.log(abstractImgs);
    //         console.log("ended");
    //     } catch (error) {
    //         console.log("error: " + error);
    //     }
    // }

    const images = [

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/DJI_0093.JPG?alt=media&token=14933aaf-9693-4ace-88d5-744c879a4689", alt: 7},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/abstract%2FIMG_8992%20copy.jpg?alt=media&token=7eb57e81-f3c8-4d78-859f-c39a6a11e367", alt: 5},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/abstract%2FIMG_9812.JPG?alt=media&token=3205764a-2737-49f2-8a39-9253166e9687", alt: 6},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/DJI_0094.JPG?alt=media&token=9578bebe-87fb-4162-866e-33d907199a47", alt: 8},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/cityscape%2FIMG_9805.JPG?alt=media&token=39591915-1223-4494-a148-37cf8a8c90bc", alt: 11},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/architecture%2FDJI_0411.jpg?alt=media&token=619e004d-727f-4ffe-91ce-9d771039ad7d", alt: 12},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/cityscape%2FDJI_0090.JPG?alt=media&token=12c7ef0d-fba3-4ebd-b7e7-bd2e6d351a45", alt: 9},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/architecture%2FDJI_0437.jpg?alt=media&token=cfedb084-1c99-441c-aa38-09e291ea4c0c", alt: 13},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/architecture%2FDJI_0440.jpg?alt=media&token=e3448a32-f407-4f08-8cc8-366c499f25a9", alt: 14},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/cityscape%2FDJI_0093.JPG?alt=media&token=c3ced952-9d96-4c0c-8519-42aeebbdbc57", alt: 10},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/architecture%2FDJI_0445.jpg?alt=media&token=062a31f6-e4e0-4dbb-b08a-df1ee2b3cb89", alt: 15},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/architecture%2FDJI_0460.jpg?alt=media&token=bea8bf37-8a98-43bc-9806-393fc7082179", alt: 16},

        {src: "https://storage.googleapis.com/droneworks-14880.appspot.com/abstract/DJI_0774.JPG?Expires=3600&GoogleAccessId=firebase-adminsdk-x91e9%40droneworks-14880.iam.gserviceaccount.comSignature=JQfIaBWA4cajR8M3gOIGMTpYc1bRacPeq1p88g%2FOYWawiRIxKvAEBKxIDA%2BCvdHvqXGs%2B9vInvf7EG%2Fji8as04zrxJl1B0%2FALkAJndKzp%2FM%2BhCueMTNOJzWb4xNPickLDEIGYxu4zcnehDtyUHfs%2FlbzofeVQddywoXcSI%2FiP%2BNCNYiX9PuHAsrWgDHxHtlysX%2BuaroubpRgAn4LjL0P2oB2G7%2Fwj67SJuF7tdKb08wXbP3zdWnb7TnuQb5AVaSza90%2B08%2Brg5uSjwDiitb4TsOtI%2F1W0oMk5hNGC%2FQW3dfU4kLFrQYrBKCm2CUTPv5WBuotCpsO%2BZrMv2W7RIvg%2Bw%3D%3D", alt: "0", id: 0},

        {src:"https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/abstract%2FIMG_1307.JPG?alt=media&token=36824a0f-c8e3-4997-9ea2-f2526355bf82", alt: 2},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/abstract%2FIMG_1319.jpg?alt=media&token=002a335d-72d6-4586-bbf8-25c4197c7e43", alt: 3},

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/abstract%2FIMG_7439.JPG?alt=media&token=2eaebf87-6c3c-4792-9b6d-f79eec704f71", alt: 4},

        
    ]

    onMount(async () => {
        try {
            isReady.set(false);
            await fetchSpecImg()
        } 
        catch(error) {
            console.log("error: " + error);
        }
        finally {
            isReady.set(true);
        }
        
    })
</script>

{#if $isReady}

    <!-- <Gallery> -->
        <!-- <Gallery items={abstractImgs} class="gap-4 grid-cols-2 md:grid-cols-4"></Gallery> -->
    <!-- </Gallery> -->

{:else}

    Loading

{/if}

<div class="gallerywrapper" style="padding:2rem;">
    <Gallery items={images}  class="gap-4 grid-cols-2 md:grid-cols-4"></Gallery>

</div>