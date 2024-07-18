<script>
    import { onMount } from "svelte";

    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = prodUrl;

    // Urls for development and production databases:
    const prodColl = import.meta.env.VITE_PROD_COLL;
    const devColl = import.meta.env.VITE_DEV_COLL;
    const currColl = devColl;

    let articles = []

    async function testAPI() {
        try {
            let coll = "article_info";
            coll = currColl + coll;
            const url = currUrl + "read/" + coll;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            let resData = await res.json();

            // JSON.parse turns the json string into a JavaScript array
            resData = JSON.parse(resData);

            // console.log(resData[0]["title"]);
            articles = resData;
            // console.log(all_info);

        } catch (error) {
            console.log("Error retrieving info: ", error);
        }
    }

    let images = [];

    async function getSubColl(id, subColl) {
      try {
          let coll = "article_info";
          // coll = currColl + coll;
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

    onMount(() => {
      testAPI()
    });
    
</script>

<section class="bg-gray-200 antialiased">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-gray-900">
          About us
        </h2>
        <p class="mt-4 text-base font-normal sm:text-xl text-gray-900">
          A pair of drone pilots breaking into the commercial drone industry.
        </p>
      </div>
  
      <div class="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

        {#each articles as article}

        <div class="space-y-4">
          <h3 class="text-2xl font-bold leading-tight text-gray-900">
            {article["title"]}
          </h3>
          <input type="text" id="currentarticle" value={article["title"]} readonly hidden>
          <p class="text-lg font-normal text-gray-900">
            {article["info"]}
          </p>
          <img src={article["img_src"]} alt={article["title"]}>
        </div>

        {/each}
  
      </div>
    </div>
  </section>