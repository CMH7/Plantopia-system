import { writable, readonly, readable } from "svelte/store";

export const activeModule = writable(0)

export const overlays = writable([
  {
    name: 'plant category filter',
    active: false
	},
	{
		name: 'logout modal',
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

export const months = readonly(
	readable(
		[
			{ name: "January", color: "text-[#00AEDD]" },
			{ name: "February", color: "text-[#F25050]" },
			{ name: "March", color: "text-[#A0E3F2]" },
			{ name: "April", color: "text-[#F2BA52]" },
			{ name: "May", color: "text-[#A8BF54]" },
			{ name: "June", color: "text-[#DDACF2]" },
			{ name: "July", color: "text-[#F2BC8D]" },
			{ name: "August", color: "text-[#F28F38]" },
			{ name: "September", color: "text-[#023E73]" },
			{ name: "October", color: "text-[#F29BD4]" },
			{ name: "November", color: "text-[#F25C5C]" },
			{ name: "December", color: "text-[#4ED9CB]" },
		]
	)
);

export const pageTransitionDuration = writable(500);

