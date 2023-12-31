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
	},
	{//8
		name: 'Save changes seasonal',
		active: false
	},
	{//9
		name: 'Save changes perenual',
		active: false
	},
	{//10
		name: 'Add new seasonal plant',
		active: false
	}
])

export const searchValue = writable('')

export const plantCategories = writable([
	{
		name: "Indoor",
		selected: false,
	},
	{
		name: "Outdoor",
		selected: false,
	},
	{
		name: "Perennial",
		selected: false,
	},
	{
		name: "Annual",
		selected: false,
	},
	{
		name: "Biennial",
		selected: false,
	},
	{
		name: "Biannual",
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
	uid: '',
	name: '',
	email: '',
	password: ''
})

export const infoEditing = writable(false)

export const PIActiveTab = writable(0)

export const PICurrentPlant = writable({
	plant: {
		id: 0,
		pid: 0,
		custom: false,
		common_name: '',
		description: '',
		scientific_name: [],
		other_name: [],
		family: '',
		pruning_month: [],
		care: '',
		image: '',
		cycle: '',
		indoor: false
	},
	inTheGarden: false,
	nickname: ''
});

export const userGarden = writable([
	{
		id: '99',
		custom: false,
		nickname: 'Leng2x plant'
	}
])

export const plantopiaPerenPlants = writable([
	{
		id: "",
		pid: "",
		custom: false,
		common_name: "",
		description: "",
		scientific_name: [],
		other_name: [],
		family: "",
		pruning_month: [],
		care: "",
		image: "",
		cycle: '',
		indoor: false
	},
]);

export const notif = writable({
	show: false,
	type: 'success',
	message: 'Hello'
})

export const seasonalPlantList = writable([])

export const perenualPlantList = writable([]);

export let helpsList = writable([
	{
		id: '',
		question: '',
		answer: ''
	}
])

export const cycles = writable([
	'Annual',
	'Biannual',
	'Biennial',
	'Perennual',
	'Perennial',
	'Biennual'
])