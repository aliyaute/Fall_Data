<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte'
    let schools = []
    let adjective = "super cool"
    let nameFilter = ""
    // Update this when we update 'schools'
    $: filteredSchools = schools
    // Update this when we update 'schools'
    $: schoolCount = schools.length
    // "You should update this variable if schoolCount changes"
    $: studentCount = schoolCount * 2000
    let currentSchool = null
    let counter = 0
    function increment() {
        counter = counter + 1
    }
    function pickSchool(school) {
        console.log("You picked a school")
        currentSchool = school
    }
    onMount(async function() {
        schools = await d3.csv(require("./high_schools.csv"))
        console.log(schools)
	})
	
	let height = 500
	let width = 500
</script>
<div>
<svg {height} {width}>{each</svg>
    <p>The button has been clicked {counter} times</p>
    <button on:click={increment}>Click</button>
    <h1>This is an {adjective} webapp</h1>
    <p>There are {schoolCount} schools in NYC</p>
    <p>There are {studentCount} students in the entire system</p>
    <p>How many schools are there? <input bind:value={schoolCount} type="text"></p>
    {#if currentSchool}
        <p on:click={() => currentSchool = null}>Go back</p>
        <h2>{ currentSchool.school_name }</h2>
        <p>{ currentSchool.primary_address_line_1 }</p>
        <p>{ currentSchool.phone_number }</p>
        <p>{ currentSchool.school_email }</p>
    {/if}
    {#if !currentSchool}
        <p>Filter: 
            <input type="text" bind:value={nameFilter} placeholder="School search">
        </p>
        <p>You are searching for {nameFilter}</p>
        <ul>
        {#each filteredSchools as school}
            <li>
                <a href="#" on:click={() => pickSchool(school)}>{school.school_name}</a>
            </li>
        {/each}
        </ul>
    {/if}
</div>
<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>










