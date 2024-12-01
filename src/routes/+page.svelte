<script>
    import "../app.pcss";
    import { Heading, P, Button, Mark, Span, A } from 'flowbite-svelte';
    import { ArrowRightOutline, InstagramSolid } from 'flowbite-svelte-icons';
    import { Gallery } from 'flowbite-svelte';
    import { onMount } from "svelte";
    import { fade, blur, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { Carousel, Thumbnails } from 'flowbite-svelte';
    import { BadgeCheckOutline, EnvelopeSolid } from "flowbite-svelte-icons";
    import { Alert } from "flowbite-svelte";
    import Contact from "./Contact.svelte";
    import Articles from "./Articles.svelte";
    import Adverts from './Adverts.svelte';
  
    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = devUrl;
  
    let msg;
    let password;
  
    async function testAPI() {
        try {
            const url = currUrl + "data/";
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            const resData = await res.json();
            msg = resData["message"];
            console.log("Successfully retrieved message: " + msg);
        } catch (error) {
            console.log("Error retrieving login info: ", error);
        }
    }
  
    let mainImg = "";
  
    async function getData(id) {
        try {
            let coll = "MainPhoto";
            // const url = currUrl + "read/" + coll + "/" + id;
            const url = currUrl + "mainphotocache/";
            console.log(url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("API fetching didn't work");
            }
            let resData = await res.json();
  
            console.log(resData);
  
            mainImg = resData;
  
        } catch (error) {
            console.log("Error retrieving info: " + error);
        }
    }
  
    let images = []; 
  
    async function getImages() {
      try {
        let collection = "MainPhoto";
        const url = currUrl + "read/" + collection;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("API fetching didn't work");
        }
        let resData = await res.json();
        resData = JSON.parse(resData);
        images = resData;
        console.log(images);
      } catch (error) {
        console.log("Couldn't retrieve images! " + error);
      }
    }

    async function getBackendCache(collection) {
      const url = currUrl + "cache/" + collection;
      const res = await fetch(url);
      if (!res.ok) {
        console.log('Failure to get cached collection');
        throw new Error('Failure to get cached collection');
      }
      const resData = await res.json();
      const result = JSON.parse(resData);
      
      return result;
    }

    let index = 0;
    let forward = true; // sync animation direction between Thumbnails and Carousel
  
    // import db from "../firebase"
  
    // Intersection Obvserver functionality: (source: https://www.youtube.com/watch?v=T33NN_pPeNI)
    let ready = false;
  
    onMount(async () => {
      testAPI(); 
      images = await getBackendCache("MainPhoto");
  
      ready = true;
  
      getData("mainphoto");
  
      // getImages();
  
    });
  
  
  </script>
  
  <style>
  
  /* .sectionsok  {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  
  .show {
    opacity: 1;
    transform: translateX(0);
  }
  
  /* .buttons {
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: grid;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  } */
  
  </style>

  <svelte:head>
    <title>DroneWorks</title>
  </svelte:head>
  
  <div class="show"></div>
  
  {#if ready}
  
    <div class="hero bg-gray-200">
      <div class="hero-overlay bg-gray-200">
        <img src={mainImg["src"]} alt="MainImage">
      </div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <Heading class="text-white">
            DroneWorks
          </Heading>
          <br>
          <Button href="#ourwork" class="mainbuttons bg-blue-10000 hover:bg-blue-6000">See our work</Button>
          <Button href="#aboutus" class="mainbuttons bg-blue-6000 hover:bg-blue-6000">Who are we?</Button>
        </div>
      </div>
    </div>
  
    <div class="advertwrapper" id="ourwork">
      <Adverts></Adverts>
    </div>
  
    <div class="carouselwrapper bg-gray-200">
      <Carousel {images} duration="3000"/>
    </div>
    
    <div class="articleswrapper" id="aboutus">
      <Articles></Articles>
    </div>
    
    <!-- <section class="sectionsok bg-gray-200" id="section3">
      <div class="buttons">
        <Button size="xl" target="_blank" class="bg-blue-700"><EnvelopeSolid class="w-6 h-6 me-2"/><a href="mailto:droneworks@bosdroneworks.com">Send us an email!</a></Button>
        <Button size="xl" target="_blank" class="bg-purple-600"><InstagramSolid></InstagramSolid><a href="https://www.instagram.com/droneworks.media/">Follow our Instagram!</a></Button>
      </div>
    </section>
    
     -->
    <!-- <Alert color="yellow" bordercolor="blue">
      <span><b>Website Under Construction:</b></span>
      We are still developing the site, so let us know of any suggestions, and stay tuned for future improvements!
    </Alert> -->
  
  {:else}
  
    <div class="spinnercontainer bg-gray-200">
      <span class="spinner loading loading-infinity loading-lg"></span>
    </div>
  
  {/if}