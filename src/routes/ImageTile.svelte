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

        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp1.webp?alt=media&token=797bb14c-1eba-4b0f-8303-7a51330f0ba6", alt: 40},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp10.webp?alt=media&token=70830192-f362-4395-822d-58d9ed02e8ab", alt: 41},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp11.webp?alt=media&token=1eb420f4-9c8d-46f5-9a9d-8f15de83ea36", alt: 42},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp12.webp?alt=media&token=2b2c7cef-ccbd-4929-952d-9ed2a50fa39b", alt: 43},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp13.webp?alt=media&token=122161e5-fc53-4483-81f1-da62686bba34", alt: 44},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp14.webp?alt=media&token=d4cdd716-9536-44c7-af62-811b65d53201", alt: 45},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp2.webp?alt=media&token=060e5469-1b94-43a4-be66-76ca4b0a6446", alt: 46},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp3.webp?alt=media&token=794fb258-8079-4b0b-80f0-a166b9449116", alt: 47},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp4.webp?alt=media&token=f38f0289-aae8-4308-9cc0-33c7d3da2304", alt: 48},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp5.webp?alt=media&token=41526eec-c633-4a89-9cd8-8a6f242fec5e", alt: 49},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp6.webp?alt=media&token=f86d734c-897a-498c-a8f5-eb2d8eff4bf4", alt: 410},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp7.webp?alt=media&token=b09a8cee-1e22-4179-8b17-b6e5f5b87b1d", alt: 420},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp8.webp?alt=media&token=b55aca0a-05e9-4614-96dc-faa9ac547596", alt: 430},
        {src: "https://firebasestorage.googleapis.com/v0/b/droneworks-14880.appspot.com/o/webp-imgs%2Fcomp9.webp?alt=media&token=d7f2146a-854b-4af8-a017-31d6d378926d", alt: 440}
        
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