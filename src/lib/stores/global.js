import { writable } from "svelte/store";

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