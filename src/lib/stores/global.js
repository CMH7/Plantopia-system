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
	},
	{
		name: 'save info changes',
		active: false
	},
	{
		name: 'add to mygarden',
		active: false
	},
	{
		name: 'plant new nickname',
		active: false
	},
	{
		name: 'remove to mygarden',
		active: false
	},
	{
		name: 're-nickname plant',
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

export const pageTransitionDuration = writable(150);

export const userDetails = writable({
	uid: 'xxx',
	name: 'Charles Maverick Herrera',
	email: 'charlesm.herrera0700@gmail.com',
	password: 'secret1234'
})

export const infoEditing = writable(false)

export const PIActiveTab = writable(0)

export const PICurrentPlant = writable({
	plant: {
		id: '',
		common_name: '',
		description: '',
		scientific_name: [],
		other_name: [],
		family: '',
		pruning_month: [],
		care: '',
		image: '',
	},
	inTheGarden: false,
});

export const userGarden = writable([
	{
		id: '99',
		custom: false,
		nickname: 'Leng2x plant'
	}
])

export const notif = writable({
	show: false,
	type: 'success',
	message: 'Hello'
})