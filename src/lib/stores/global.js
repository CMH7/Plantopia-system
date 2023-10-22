import { writable, readonly, readable } from "svelte/store";

export const activeModule = writable(0)

export const overlays = writable([
  {
    name: 'plant category filter',
    active: false
  }
])

export const plantCategories = writable([
	{
		name: "Climbers",
		selected: false,
	},
	{
		name: "Creepers",
		selected: false,
	},
	{
		name: "Herbs",
		selected: false,
	},
	{
		name: "Shrubs",
		selected: false,
	},
	{
		name: "Trees",
		selected: false,
	},
]);

export const months = readonly(readable(
	[
		"January",
		"Februrary",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
));

