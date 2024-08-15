<script>
    import "../app.pcss";
    import { page } from '$app/stores';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    $: activeUrl = $page.url.pathname;
    import { DarkMode, Button } from 'flowbite-svelte';
    import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
    import { onNavigate } from '$app/navigation';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { inject } from '@vercel/analytics';

    // Urls for development and production servers:
    const prodUrl = import.meta.env.VITE_PROD_URL;
    const devUrl = import.meta.env.VITE_DEV_URL;
    const currUrl = prodUrl;
  
    injectSpeedInsights();
  
  </script>

  <style>
    .droneworksa {
      color: black;
    }
  </style>

  <svelte:head>
    <title>BosDroneWorks</title>
    <meta name="description" content="DroneWorks is the best and fastest growing drone-media company within the greater Boston area. DroneWorks is committed to ensuring the best customer experience and highest quality aerial media for you and your clients, making your aerial dreams come true.">
    <meta property="og:title" content="DroneWorks - Making your aerial dreams come true.">
  </svelte:head>

  <slot></slot>

  <Footer footerType="logo" class="bg-gray-300">
    <div class="sm:flex sm:items-center sm:justify-between bg-gray-300">
      <Button class="bg-gray-300 hover:bg-gray-300 text-white"><a class="droneworksa" href="/">DroneWorks</a></Button>
      <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-900 sm:mb-0 dark:text-gray-400">
        <FooterLink target="_blank" href="https://www.instagram.com/droneworks.media/">Instagram</FooterLink>
        <FooterLink target="_blank" href="mailto:droneworks@bosdroneworks.com">Email</FooterLink>
        <FooterLink>857-331-5384</FooterLink>
      </FooterLinkGroup>
    </div>
    <hr class="my-6 border-gray-900 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <FooterCopyright href="/" by="DroneWorks™" />
  </Footer>
  