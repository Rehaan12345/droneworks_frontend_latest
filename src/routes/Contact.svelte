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
  
    let contacts = []
  
    async function getContacts() {
      try {
          let coll = "Contact";
          // coll = currColl + coll;
          const url = currUrl + "read/" + coll;
          const res = await fetch(url);
          if (!res.ok) {
              throw new Error("API fetching didn't work");
          }
          let resData = await res.json();
  
          // JSON.parse turns the json string into a JavaScript array
          resData = JSON.parse(resData);
  
          contacts = resData;
  
          console.log(contacts);
  
      } catch (error) {
          console.log("Error retrieving info: ", error);
      }
    }
  
    onMount(() => {
      getContacts();
    })
  
  </script>
  
  <style>
    .contact {
      padding: 1rem;
      border-radius: 15px;
    }
  </style>
  
  <section class="bg-gray-200">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's get in touch!</h2>
            <p class="text-gray-600 sm:text-xl dark:text-gray-600">To contact us, you can reach us at the following places:</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {#each contacts as contact}
            <div class="contact bg-gray-300">
                <h3 class="mb-2 text-xl dark:text-white">{contact["title"]} at <b> <a href={contact["link"]}> {contact["info"]} </a></b></h3>
            </div>
          {/each}
        </div>
    </div>
  </section>