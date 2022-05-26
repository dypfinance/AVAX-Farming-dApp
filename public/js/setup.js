window.IS_CONNECTED = false
window.WALLET_TYPE = ''
window.the_graph_result = {}
// MAKE SURE THIS ADDRESS IS LOWERCASE
const TOKEN_ADDRESS = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
const TOKEN_IDYP_ADDRESS = "0xbd100d061e120b2c67a24453cf6368e63f1be056"

// MAKE SURE ALL THESE ADDRESSES ARE LOWERCASE
const TOKENS_DISBURSED_PER_YEAR = [
	360_000,
	540_000,
	900_000,
	1_200_000,

	660_000,
	996_000,
	1_680_000,
	2_220_000,
	2_760_000,
]

window.rebase_factors = [
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
]

const LP_IDs =
	{
		"eth": [
			"0x497070e8b6c55fd283d8b259a6971261e2021c01-0x499c588146443235357e9c630a66d6fe0250caa1",
			"0x497070e8b6c55fd283d8b259a6971261e2021c01-0xd8af0591be4fba56e3634c992b7fe4ff0a90b584",
			"0x497070e8b6c55fd283d8b259a6971261e2021c01-0xbebe1fe1444a50ac6ee95ea25ba80adf5ac7322c",
			"0x497070e8b6c55fd283d8b259a6971261e2021c01-0x79be220ab2dfcc2f140b59a97bfe6751ed1579b0",
		],
		"wavax": [
			"0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x035d65babf595758d7a439d5870badc44218d028",
			"0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x6c325dfea0d18387d423c869e328ef005cba024f",
			"0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x85c4f0cea0994de365dc47ba22dd0fd9899f93ab",
			"0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x6f5dc6777b2b4667bf183d093111867239518af5",
			"0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x10e105676cac55b74cb6500a8fb5d2f84804393d",
		]
}

window.LP_IDs = LP_IDs

const LP_ID_LIST = Object.keys(LP_IDs).map(key => LP_IDs[key]).flat()
const TOKENS_DISBURSED_PER_YEAR_BY_LP_ID = {}
LP_ID_LIST.forEach((lp_id, i) => TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] = TOKENS_DISBURSED_PER_YEAR[i])
const VAULT_ADDRESSES_LIST = LP_ID_LIST.map(id => id.split('-')[1])

window.LP_ID_LIST = LP_ID_LIST

window.config = {
	max_referral_addresses_per_call: 4,
	ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',

	// address of eth token on bsc!
	claim_as_eth_address: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
	
	admin_address: '0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F',

	vote_duration_in_seconds: 5 * 60, // 5 minutes for test
	execution_allowance_in_seconds: 5 * 60, // 5 minutes for test

	MIN_BALANCE_TO_INIT_PROPOSAL: 100e18,
	QUORUM: 1000e18,

	//dyp-eth 3 days
	token_address: '0x497070e8b6c55fd283d8b259a6971261e2021c01',
	staking_address: '0x499c588146443235357e9c630a66d6fe0250caa1',

	//dyp-eth 30 days
	token_dyp30_address: '0x497070e8b6c55fd283d8b259a6971261e2021c01',
	staking_dyp30_address: '0xd8af0591be4fba56e3634c992b7fe4ff0a90b584',

	//dyp-eth 60 days
	token_dyp60_address: '0x497070e8b6c55fd283d8b259a6971261e2021c01',
	staking_dyp60_address: '0xbebe1fe1444a50ac6ee95ea25ba80adf5ac7322c',

	//dyp-eth 60 days
	token_dyp90_address: '0x497070e8b6c55fd283d8b259a6971261e2021c01',
	staking_dyp90_address: '0x79be220ab2dfcc2f140b59a97bfe6751ed1579b0',

	reward_token_address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
	reward_token_idyp_address: '0xbd100d061e120b2c67a24453cf6368e63f1be056',
	weth_address: '0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15',
	etherscan_baseURL: 'https://cchain.explorer.avax.network',
	max_proposals_per_call: 4,
	// default_gasprice_gwei: 60,
	default_gas_amount: 1200000,
	token_decimals: 18,
	lp_amplify_factor: 1e0,

	//Vesting Buyers
	constant_staking_30_address: '0x073dc8ff1b51ad420c5a9eb3c1411ac2be02313b',
	//Staking Buyers
	constant_staking_60_address: '0xD9bCF07a6b98D8254584C6175117a030879d4994',

	//Vesting Airdrop
	constant_staking_90_address: '0x997A7254E5567d0A70329DEFCc1E4d29d71Ba224',
	//Staking Airdrop
	constant_staking_120_address: '0x90D0D2CA6D962aC87d884f1095d1c1C5F3DD2B5D',

	//Vesting Private
	constant_staking_130_address: '0x619613733CFf2Ea82023389B9D04040b402833fA',

	USDCe_address: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',

	//constant staking New
	constant_stakingnew_new1_address: '0x1A4fd0E9046aeD92B6344F17B0a53969F4d5309B',
	constant_stakingnew_new2_address: '0x5566B51a1B7D5E6CAC57a68182C63Cb615cAf3f9',

	//Buyback new
	buyback_staking1_1_address: '0xC905D5DD9A4f26eD059F76929D11476B2844A7c3',
	buyback_staking1_2_address: '0x267434f01ac323C6A5BCf41Fa111701eE0165a37',
	//constant staking for Buyback New
	constant_stakingnew_new3_address: '0xe6B307CD185f2A541a661eA312E3e7939Ea9d218',
	constant_stakingnew_new4_address: '0x934819D227B7095595eC9cA6604eF2Dd0C3a9EA2',


	//Farming new
	token_new_address: '0x66eecc97203704d9e2db4a431cb0e9ce92539d5a',
	farming_new_1_address: '0x035d65babF595758D7A439D5870BAdc44218D028',
	constant_stakingnew_new5_address: '0x1cA9Fc98f3b997E08bC04691414e33B1835aa7e5',

	//Farming New
	farming_new_2_address: '0x6c325DfEA0d18387D423C869E328Ef005cBA024F',
	constant_stakingnew_new6_address: '0x6a258Bd17456e057A7c6102177EC2f9d64D5F9e4',


	//Farming New
	farming_new_3_address: '0x85C4f0CEA0994dE365dC47ba22dD0FD9899F93Ab',
	constant_stakingnew_new7_address: '0xC2ba0abFc89A5A258e6440D82BB95A5e2B541581',

	//Farming New
	farming_new_4_address: '0x6f5dC6777b2B4667Bf183D093111867239518af5',
	constant_stakingnew_new8_address: '0x4c16093Da4BA7a604A1Fe8CD5d387cC904B3D407',

	//Farming New
	farming_new_5_address: '0x10E105676CAC55b74cb6500a8Fb5d2f84804393D',
	constant_stakingnew_new9_address: '0x9FF3DC1f7042bAF46651029C7284Fc3B93e21a4D',

	//Constant Staking iDYP
	constant_stakingidyp_1_address: '0x8f28110325a727f70b64bffebf2b9dc94b932452',
	constant_stakingidyp_2_address: '0x5536e02336771cfa0317d4b6a042f3c38749535e',

	//reward_as_png: '0x60781c2586d68229fde47564546784ab3faca982',

	cg_ids: {
		'main': 'avalanche-2',
		'platform-token': 'defi-yield-protocol',

		// lowercase token address => coingecko id
		'0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17': 'defi-yield-protocol',
	},

	/*buyback*/
	buyback_staking_address: '0x4c7e0cbb0276a5e963266e6b9f34db73a1cb73f3',
	slippage_tolerance_percent: 5, // 3% slippage tolerance
	tx_max_wait_seconds: 20 * 60, // 20 mins - deposit and withdraw tx will fail (swap will fail) after this duration of being pending
	uniswap_router_address: '0xe54ca86531e17ef3616d22ca28b0d458b6c89106',
	pangolin_router_address: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',

	reward_token_dyps_address: '0x4689545A1389E7778Fd4e66F854C91Bf8aBacBA9',

	//Constant Staking DYP -> DAI
	constant_stakingdai_address: '0x16429e51A64B7f88D4C018fbf66266A693df64b3',
	reward_token_dai_address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70'
}

// add buyback supported deposit tokens here, lowercase
// THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
window.buyback_tokens = {
	'0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': {
		symbol: 'WAVAX', decimals: 18
	},
	'0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab': {
		symbol: 'WETH.e', decimals: 18
	},
	'0x50b7545627a5162f82a992c33b87adc75187b218': {
		symbol: 'WBTC.e', decimals: 8
	},
	'0x60781c2586d68229fde47564546784ab3faca982': {
		symbol: 'PNG', decimals: 18
	},
	'0xc7198437980c041c805a1edcba50c1ce5db95118': {
		symbol: 'USDT.e', decimals: 6
	},
	'0x8729438eb15e2c8b576fcc6aecda6a148776c0f5': {
		symbol: 'QI', decimals: 18
	},
	'0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664': {
		symbol: 'USDC.e', decimals: 6
	},
	'0xd586e7f844cea2f87f50152665bcbc2c279d8d70': {
		symbol: 'DAI.e', decimals: 18
	},
	'0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4': {
		symbol: 'XAVA', decimals: 18
	},
	'0x5947bb275c521040051d82396192181b413227a3': {
		symbol: 'LINK.e', decimals: 18
	}
}

window.buyback_tokens_farming = {
	'0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': {
		symbol: 'WAVAX', decimals: 18
	},
	'0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab': {
		symbol: 'WETH.e', decimals: 18
	},
	'0x50b7545627a5162f82a992c33b87adc75187b218': {
		symbol: 'WBTC.e', decimals: 8
	},
	'0x60781c2586d68229fde47564546784ab3faca982': {
		symbol: 'PNG', decimals: 18
	},
	'0xc7198437980c041c805a1edcba50c1ce5db95118': {
		symbol: 'USDT.e', decimals: 6
	},
	'0x8729438eb15e2c8b576fcc6aecda6a148776c0f5': {
		symbol: 'QI', decimals: 18
	},
	'0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664': {
		symbol: 'USDC.e', decimals: 6
	},
	'0xd586e7f844cea2f87f50152665bcbc2c279d8d70': {
		symbol: 'DAI.e', decimals: 18
	},
	'0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4': {
		symbol: 'XAVA', decimals: 18
	},
	'0x5947bb275c521040051d82396192181b413227a3': {
		symbol: 'LINK.e', decimals: 18
	},
	'0xbd100d061e120b2c67a24453cf6368e63f1be056': {
		symbol: 'iDYP', decimals: 18
	}
}

window.vaults = [
	{
		hidden: false,
		contract_address: window.config.staking_address,
		short_name: 'AVAX/DYP Pool',
		logo: '/images/avax.png',
		name: 'AVAX/DYP LP Pool\n72 Hours Locking',
		description: 'Deposit LP and earn WAVAX/ETH/DYP',
		return_heading: 'Pool Rewards',
		return_description: '250,000 DYP / month',
		link: '/staking-avax'
	}
]

window.vaultsEth = [
	{
		hidden: false,
		contract_address: window.config.staking_address,
		short_name: 'AVAX/DYP Pool',
		logo: '/images/avax.png',
		logo1: '/images/ETH_2.png',
		logo2: '/images/DYP.png',
		name: 'AVAX/DYP\n3 Days Locking',
		description: 'Deposit LP and earn WAVAX/ETH/DYP',
		return_heading: 'Pool Rewards',
		return_description: '30,000 DYP / month',
		link: '/staking-avax-3'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp30_address,
		short_name: 'AVAX/DYP Pool',
		logo: '/images/avax.png',
		logo1: '/images/ETH_2.png',
		logo2: '/images/DYP.png',
		name: 'AVAX/DYP\n30 Days Locking',
		description: 'Deposit LP and earn WAVAX/ETH/DYP',
		return_heading: 'Pool Rewards',
		return_description: '45,000 DYP / month',
		link: '/staking-avax-30'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp60_address,
		short_name: 'AVAX/DYP Pool',
		logo: '/images/avax.png',
		logo1: '/images/ETH_2.png',
		logo2: '/images/DYP.png',
		name: 'AVAX/DYP\n60 Days Locking',
		description: 'Deposit LP and earn WAVAX/ETH/DYP',
		return_heading: 'Pool Rewards',
		return_description: '75,000 DYP / month',
		link: '/staking-avax-60'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp90_address,
		short_name: 'AVAX/DYP Pool',
		logo: '/images/avax.png',
		logo1: '/images/ETH_2.png',
		logo2: '/images/DYP.png',
		name: 'AVAX/DYP\n90 Days Locking',
		description: 'Deposit LP and earn WAVAX/ETH/DYP',
		return_heading: 'Pool Rewards',
		return_description: '100,000 DYP / month',
		link: '/staking-avax-90'
	}
]

window.STAKING_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addContractBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trustedClaimableTokenAddress",
				"type": "address"
			}
		],
		"name": "addTrustedClaimableToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnRewardTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "claimAsToken",
				"type": "address"
			}
		],
		"name": "claimAs",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToDeposit",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "swapPath",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "ClaimableTokenAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "ClaimableTokenRemoved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "disburseRewardTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EthRewardsDisbursed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EthRewardsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trustedClaimableTokenAddress",
				"type": "address"
			}
		],
		"name": "removeTrustedClaimableToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsDisbursed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyOldERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminCanClaimAfter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminClaimableTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BURN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnOrDisburseTokensPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cliffTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractDeployTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disburseAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disburseDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disbursePercentX100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "getDepositorsList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stakers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakingTimestamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "lastClaimedTimeStamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakedTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMaxSwappableAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfHolders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPendingDisbursement",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivsEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastBurnOrTokenDistributeTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaimedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastDisburseTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastEthDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastSwapExecutionTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAGIC_NUMBER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SLIPPAGE_TOLERANCE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "SWAP_PATH",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapAttemptPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensToBeDisbursedOrBurnt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensToBeSwapped",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewardsEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalEthDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "trustedClaimableTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedDepositTokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedRewardTokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapRouterV2",
		"outputs": [
			{
				"internalType": "contract IPangolinRouter",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Pair",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Pair",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

window.BUYBACK_STAKING_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "DepositTokenAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "DepositTokenRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Stake",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Unstake",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_CAN_CLAIM_AFTER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LOCKUP_TIME",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_INTERVAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRUSTED_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "addTrustedDepositToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "claimAnyToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "emergencyUnstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfHolders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "getStakersList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stakers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakingTimestamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "lastClaimedTimeStamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakedTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getTotalPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaimedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "removeTrustedDepositToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rewardsPendingClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToDeposit",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "depositToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "trustedDepositTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Router",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.CONSTANT_STAKING_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
		"name": "ReferralFeeTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
		"name": "Reinvest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
		"name": "RewardsTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_CAN_CLAIM_AFTER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LOCKUP_TIME",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REFERRAL_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_INTERVAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STAKING_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRUSTED_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UNSTAKING_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "depositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}],
		"name": "getActiveReferredStaker",
		"outputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_totalEarned",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfHolders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}],
		"name": "getNumberOfReferredStakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_activeStakers",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalStakers",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}],
		"name": "getPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}],
		"name": "getReferredStaker",
		"outputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_totalEarned",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}],
		"name": "getStakersList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stakers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakingTimestamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "lastClaimedTimeStamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakedTokens",
				"type": "uint256[]"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}],
		"name": "getTotalPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "lastClaimedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reInvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "referrals",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "rewardsPendingClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountToStake",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stakeExternal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "stakingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedReferralFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "totalEarnedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"name": "totalReferralFeeEarned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
		"name": "transferAnyLegacyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedStakingContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
		"stateMutability": "view",
		"type": "function"
	}]

window.TOKEN_ABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


/* New ABI's for the V2 smart contracts */
window.CONSTANT_STAKINGNEW_ABI = [{"inputs":[{"internalType":"address","name":"_uniswapV2RouterAddress","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"},{"internalType":"address","name":"trustedDepositTokenAddress","type":"address"},{"internalType":"address","name":"trustedRewardTokenAddress","type":"address"},{"internalType":"uint256","name":"referralFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardInterval","type":"uint256"},{"internalType":"uint256","name":"lockupTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"EmergencyDeclared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"FeeRecipientAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newLockupTime","type":"uint256"}],"name":"LockupTimeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"ReferralFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralFeeTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"StakingFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"TrustedDepositContractAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"TrustedDepositContractRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"UniswapV2RouterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"UnstakingFeeChanged","type":"event"},{"inputs":[],"name":"EMERGENCY_WAIT_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCKUP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFERRAL_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_DEPOSIT_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_REWARD_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addTrustedDepositContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminCanClaimAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_claim","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAnyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"declareEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_stakingReferralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"depositByContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getActiveReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"getNumberOfReferredStakers","outputs":[{"internalType":"uint256","name":"_activeStakers","type":"uint256"},{"internalType":"uint256","name":"_totalStakers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getStakersList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getTotalPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isTrustedDepositContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_reinvest","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"reInvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeTrustedDepositContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsPendingClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"referralFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"}],"name":"setContractVariables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setFeeRecipientAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newLockupTime","type":"uint256"}],"name":"setLockupTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newReferralFeeRateX100","type":"uint256"}],"name":"setReferralFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newStakingFeeRateX100","type":"uint256"}],"name":"setStakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Router","name":"_newUniswapV2Router","type":"address"}],"name":"setUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newUnstakingFeeRateX100","type":"uint256"}],"name":"setUnstakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToStake","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedReferralFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalReferralFeeEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

window.BUYBACK_STAKING1_1_ABI = [{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"trustedPlatformTokenAddress","type":"address"},{"internalType":"address","name":"trustedDepositTokenAddress","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"adminCanClaimAfter","type":"uint256"},{"internalType":"uint256","name":"rewardRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardInterval","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"DepositTokenAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"DepositTokenRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"EmergencyDeclared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"FeeRecipientAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lockupTime","type":"uint256"}],"name":"LockupTimeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"StakingContractChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"StakingFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"UniswapV2RouterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"UnstakingFeeChanged","type":"event"},{"inputs":[],"name":"EMERGENCY_WAIT_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCKUP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_DEPOSIT_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_PLATFORM_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_STAKING_CONTRACT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"addTrustedDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAnyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"declareEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getStakersList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getTotalPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reInvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"removeTrustedDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsPendingClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setContractVariables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setFeeRecipientAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"}],"name":"setLockupTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trustedStakingContractAddress","type":"address"}],"name":"setStakingContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStakingFeeRateX100","type":"uint256"}],"name":"setStakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Router","name":"router","type":"address"}],"name":"setUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newUnstakingFeeRateX100","type":"uint256"}],"name":"setUnstakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToDeposit","type":"uint256"},{"internalType":"address","name":"depositToken","type":"address"},{"internalType":"uint256","name":"_amountOutMin_75Percent","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_25Percent","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_stakingReferralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDepositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"trustedDepositTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

window.BUYBACK_STAKING1_2_ABI = [{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"trustedPlatformTokenAddress","type":"address"},{"internalType":"address","name":"trustedDepositTokenAddress","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"adminCanClaimAfter","type":"uint256"},{"internalType":"uint256","name":"rewardRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardInterval","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"DepositTokenAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"DepositTokenRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"EmergencyDeclared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"FeeRecipientAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lockupTime","type":"uint256"}],"name":"LockupTimeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"StakingContractChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"StakingFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"UniswapV2RouterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"UnstakingFeeChanged","type":"event"},{"inputs":[],"name":"EMERGENCY_WAIT_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCKUP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_DEPOSIT_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_PLATFORM_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_STAKING_CONTRACT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"addTrustedDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAnyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"declareEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getStakersList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getTotalPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reInvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"removeTrustedDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsPendingClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setContractVariables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setFeeRecipientAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"}],"name":"setLockupTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trustedStakingContractAddress","type":"address"}],"name":"setStakingContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStakingFeeRateX100","type":"uint256"}],"name":"setStakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Router","name":"router","type":"address"}],"name":"setUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newUnstakingFeeRateX100","type":"uint256"}],"name":"setUnstakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToDeposit","type":"uint256"},{"internalType":"address","name":"depositToken","type":"address"},{"internalType":"uint256","name":"_amountOutMin_75Percent","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_25Percent","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_stakingReferralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDepositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"trustedDepositTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

window.FARMING_NEW_ABI = [{"inputs":[{"internalType":"address[]","name":"swapPath","type":"address[]"},{"internalType":"address","name":"_uniswapV2RouterAddress","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"ClaimableTokenAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"ClaimableTokenRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"EmergencyDeclared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthRewardsDisbursed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthRewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"FeeRecipientAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lockupTime","type":"uint256"}],"name":"LockupTimeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMagicNumber","type":"uint256"}],"name":"MagicNumberChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsDisbursed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"StakingFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"UniswapV2RouterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"UnstakingFeeChanged","type":"event"},{"inputs":[],"name":"BURN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EMERGENCY_WAIT_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAGIC_NUMBER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"SWAP_PATH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addContractBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trustedClaimableTokenAddress","type":"address"}],"name":"addTrustedClaimableToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminCanClaimAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnOrDisburseTokensPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnRewardTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin_claimAsToken_dyp","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_attemptSwap","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAnyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"claimAsToken","type":"address"},{"internalType":"uint256","name":"_amountOutMin_claimAsToken_weth","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_claimAsToken_dyp","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_attemptSwap","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claimAs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cliffTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractDeployTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"declareEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositToken","type":"address"},{"internalType":"uint256","name":"amountToStake","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disburseAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disburseDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disbursePercentX100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disburseRewardTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeRecipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getDepositorsList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxSwappableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPendingDisbursement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivsEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBurnOrTokenDistributeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDisburseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastEthDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastSwapExecutionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trustedClaimableTokenAddress","type":"address"}],"name":"removeTrustedClaimableToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMagicNumber","type":"uint256"},{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"address","name":"_uniswapV2RouterAddress","type":"address"},{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setContractVariables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setFeeRecipientAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newLockupTime","type":"uint256"}],"name":"setLockupTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMagicNumber","type":"uint256"}],"name":"setMagicNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStakingFeeRateX100","type":"uint256"}],"name":"setStakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Router","name":"router","type":"address"}],"name":"setUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newUnstakingFeeRateX100","type":"uint256"}],"name":"setUnstakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAttemptPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensToBeDisbursedOrBurnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensToBeSwapped","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewardsEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEthDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trustedBaseTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"trustedClaimableTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedDepositTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedPlatformTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedRewardTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedStakingContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouterV2","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"withdrawAsToken","type":"address"},{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]


window.WETH_ABI = window.TOKEN_ABI
window.REWARD_TOKEN_ABI = window.TOKEN_ABI
window.REWARD_TOKEN_IDYP_ABI = window.TOKEN_ABI
window.REWARD_TOKEN_DAI_ABI = window.TOKEN_ABI
window.cached_contracts = {}

/* old object key */
// Object.keys(window.config).filter(k => (k.startsWith('token_') || k.startsWith('staking_') || k.startsWith('constant_staking_')) && k.endsWith('_address'))
// 	.forEach(k => {
// 		window[k.replace('_address', '_ABI').toUpperCase()] = (k.startsWith('token_')) ? window.TOKEN_ABI : (k.startsWith('constant_staking_')) ? window.CONSTANT_STAKING_ABI : window.STAKING_ABI
// 	})

window.CONSTANT_STAKING_IDYP_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralFeeTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"inputs":[],"name":"ADMIN_CAN_CLAIM_AFTER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCKUP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFERRAL_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"emergencyUnstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getActiveReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"getNumberOfReferredStakers","outputs":[{"internalType":"uint256","name":"_activeStakers","type":"uint256"},{"internalType":"uint256","name":"_totalStakers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getStakersList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getTotalPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reInvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsPendingClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToStake","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedReferralFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalReferralFeeEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyLegacyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

window.CONSTANT_STAKING_DAI_ABI = [{"inputs":[{"internalType":"address","name":"_uniswapV2RouterAddress","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"},{"internalType":"address","name":"trustedDepositTokenAddress","type":"address"},{"internalType":"address","name":"trustedRewardTokenAddress","type":"address"},{"internalType":"uint256","name":"referralFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardRateX100","type":"uint256"},{"internalType":"uint256","name":"rewardInterval","type":"uint256"},{"internalType":"uint256","name":"lockupTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"EmergencyDeclared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"FeeRecipientAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newLockupTime","type":"uint256"}],"name":"LockupTimeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"ReferralFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralFeeTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"StakingFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"TrustedDepositContractAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"TrustedDepositContractRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"UniswapV2RouterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"UnstakingFeeChanged","type":"event"},{"inputs":[],"name":"EMERGENCY_WAIT_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCKUP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFERRAL_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_DEPOSIT_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_REWARD_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_WETH_TOKEN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNSTAKING_FEE_RATE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addTrustedDepositContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminCanClaimAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_claim","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAnyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"declareEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getActiveReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"getNumberOfReferredStakers","outputs":[{"internalType":"uint256","name":"_activeStakers","type":"uint256"},{"internalType":"uint256","name":"_totalStakers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getReferredStaker","outputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"uint256","name":"_totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getStakersList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getTotalPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isTrustedDepositContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_reinvest","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"reInvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeTrustedDepositContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsPendingClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockupTime","type":"uint256"},{"internalType":"uint256","name":"referralFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"stakingFeeRateX100","type":"uint256"},{"internalType":"uint256","name":"unstakingFeeRateX100","type":"uint256"},{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"_feeRecipientAddress","type":"address"}],"name":"setContractVariables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeRecipientAddress","type":"address"}],"name":"setFeeRecipientAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newLockupTime","type":"uint256"}],"name":"setLockupTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newReferralFeeRateX100","type":"uint256"}],"name":"setReferralFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newStakingFeeRateX100","type":"uint256"}],"name":"setStakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Router","name":"_newUniswapV2Router","type":"address"}],"name":"setUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newUnstakingFeeRateX100","type":"uint256"}],"name":"setUnstakingFeeRateX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToStake","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedReferralFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalReferralFeeEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256","name":"_amountOutMin_referralFee","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

Object.keys(window.config).filter(k => (k.startsWith('token_') ||
	k.startsWith('staking_') || k.startsWith('constant_staking_')) ||
	k.startsWith('constant_stakingnew_') ||
	k.startsWith('buyback_staking1_1_') ||
	k.startsWith('buyback_staking1_2_') ||
	k.startsWith('constant_stakingidyp_') ||
	k.startsWith ('constant_stakingdai_') || k.startsWith('farming_new_') &&
	k.endsWith('_address'))
	.forEach(k => {
		window[k.replace('_address', '_ABI').toUpperCase()] = (
			k.startsWith('token_')) ? window.TOKEN_ABI :
			(k.startsWith('constant_staking_')) ? window.CONSTANT_STAKING_ABI :
				(k.startsWith('constant_stakingnew_')) ? window.CONSTANT_STAKINGNEW_ABI :
					(k.startsWith('buyback_staking1_1_')) ? window.BUYBACK_STAKING1_1_ABI :
						(k.startsWith('buyback_staking1_2_')) ? window.BUYBACK_STAKING1_2_ABI :
							(k.startsWith('constant_stakingidyp_')) ? window.CONSTANT_STAKING_IDYP_ABI :
								(k.startsWith ('constant_stakingdai_')) ? window.CONSTANT_STAKING_DAI_ABI :
									(k.startsWith('farming_new_')) ? window.FARMING_NEW_ABI : window.STAKING_ABI
	})



window.avaxweb3 = new Web3('https://api.avax.network/ext/bc/C/rpc')

// window.coinbase_address = '0x0000000000000000000000000000000000000111'

// function to connect metamask
async function connectWallet(provider, walletType) {
	//walletConnect
	if (walletType) {
		await provider.enable()
		window.web3 = new Web3(provider)
		let coinbase_address = await window.web3.eth.getAccounts()
		window.coinbase_address = coinbase_address.pop()

		window.IS_CONNECTED = true
		return true
	} else if(window.ethereum) {
		//Web3 Providers
		window.web3 = new Web3(window.ethereum)
		try {
			await window.ethereum.enable()
			console.log("Connected!")
			window.IS_CONNECTED = true
			if ( window.ethereum.isCoin98 )
				window.WALLET_TYPE = 'coin98'
			if ( window.ethereum.isMetaMask )
				window.WALLET_TYPE = 'metamask'
			let coinbase_address = await window.ethereum.request({method: 'eth_accounts'})
			window.coinbase_address = coinbase_address.pop()
			return true;
		} catch (e) {
			console.error(e)
			throw new Error("User denied wallet connection!")
		}
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider)
		console.log("connected to old web3")
		window.IS_CONNECTED = true
		return true
	} else {
		throw new Error("No web3 detected!")
	}
}

function param(name) {
	var f = new RegExp("\\b" + name + "=([^&]+)").exec(document.location.search);
	if (f) return decodeURIComponent(f[1].replace(/\+/g, " "));
}
window.param = param

window.cached_contracts_connected = {}
/**
 *
 * @param {"TOKEN" | "STAKING"} key
 */
async function getContract(key) {
	let ABI = window[key+'_ABI']
	let address = window.config[key.toLowerCase()+'_address']

	if (!window.cached_contracts_connected[key]) {
		window.cached_contracts_connected[key] = new window.avaxweb3.eth.Contract(ABI, address, {from: await getCoinbase()})
	}

	if(!window.IS_CONNECTED)
		return window.cached_contracts_connected[key]

	if (!window.cached_contracts[key]) {
		window.cached_contracts[key] = new window.web3.eth.Contract(ABI, address, {from: await getCoinbase()})
	}

	return window.cached_contracts[key]
}

function getCoinbase() {
	// if ( window.WALLET_TYPE == 'coin98' ) {
	// 	return window.coinbase_address.toLowerCase()
	// }
	// else{
	// 	return window.web3.eth.getCoinbase()
	// }
	return window.coinbase_address
}


class TOKEN {

	constructor(key="TOKEN") {
		this.key = key
		let address = window.config[key.toLowerCase()+'_address']
        this._address = address
	}

    async transfer(to, amount) {
        let contract = await getContract(this.key)

        // let gas = window.config.default_gas_amount
		// 		try {
		// 			let estimatedGas = await contract.methods['transfer'](to, amount).estimateGas({ gas })
		// 			if (estimatedGas) {
		// 				gas = Math.min(estimatedGas, gas)
		// 				//console.log('TRANSFER '+gas)
		// 			}
		// 		} catch (e) {
		// 			console.warn(e)
		// 		}
        return (await contract.methods.transfer(to, amount).send({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
    }
    async totalSupply() {
        let contract = await getContract(this.key)
        return (await contract.methods.totalSupply().call())
    }
    async approve(spender, amount) {
        let contract = await getContract(this.key)
        let gas = window.config.default_gas_amount
		// try {
		// 	let estimatedGas = await contract.methods['approve'](spender
		// 		, amount).estimateGas({ gas })
		// 	if (estimatedGas) {
		// 		gas = Math.min(estimatedGas, gas)
		// 		//console.log('estimatedgas'+gas)
		// 	}
		// } catch (e) {
		// 	console.warn(e)
		// }
        return (await contract.methods.approve(spender, amount).send({gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
    }
    async balanceOf(address) {
        let contract = await getContract(this.key)
        return (await contract.methods.balanceOf(address).call())
    }
}

class STAKING {
	constructor(ticker='STAKING', token='TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase()+'_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"depositTime",
			"cliffTime",
			"lastClaimedTime",
			"totalEarnedTokens",
			"totalEarnedEth",
			"getPendingDivs",
			"getPendingDivsEth",
			"tokensToBeDisbursedOrBurnt",
			"tokensToBeSwapped",
			"getNumberOfHolders",
			"getDepositorsList",
			"swapAttemptPeriod",
			"lastSwapExecutionTime",
			"contractDeployTime",
			"disburseDuration"
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"deposit",
			"withdraw",
			"claim",
			"claimAs"
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				//console.log(value)
				// let gas = window.config.default_gas_amount
				// try {
				// 	let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
				// 	if (estimatedGas) {
				// 		gas = Math.min(estimatedGas, gas)
				// 		//console.log('estimatedgas'+gas)
				// 	}
				// } catch (e) {
				// 	console.warn(e)
				// }
				return (await contract.methods[fn_name](...args).send({value, gas: window.config.default_gas_amount , from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
			}
		})

		// [
		// 	"claim"
		// ].forEach(fn_name => {
		// 	this[fn_name] = async function(...args) {
		// 		let contract = await getContract(this.ticker)
		// 		let value = 0;
		// 		let gas = window.config.default_gas_amount
		// 		return (await contract.methods[fn_name](...args).send({value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		// 	}
		// })

	}

	async depositTOKEN(amount) {
		let token_contract = await getContract(this.token)
		let staking_contract = await getContract(this.ticker)
        let batch = new window.web3.eth.BatchRequest()
        batch.add(token_contract.methods.approve(staking_contract._address, amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
        batch.add(staking_contract.methods.deposit(amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		return batch.execute()
	}

}

class BUYBACK_STAKING {
	constructor(ticker = 'BUYBACK_STAKING', token = 'REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase() + '_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"stakingTime",
			"LOCKUP_TIME",
			"lastClaimedTime",
			"totalEarnedTokens",
			"getPendingDivs",
			"getNumberOfHolders",
			"getStakersList",
			"getTotalPendingDivs",
			"contractStartTime",
			"REWARD_INTERVAL"
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"stake",
			"unstake",
			"reInvest",
			"claim",
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				// let gas = window.config.default_gas_amount
				// try {
				// 	let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
				// 	if (estimatedGas) {
				// 		gas = Math.min(estimatedGas, gas)
				// 		console.log('estimatedgas'+gas)
				// 	}
				// } catch (e) {
				// 	console.warn(e)
				// }
				return (await contract.methods[fn_name](...args).send({ value, gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
			}
		})
	}
}

class CONSTANT_STAKING {
	constructor(ticker = 'CONSTANT_STAKING_30', token = 'REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase() + '_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"stakingTime",
			"LOCKUP_TIME",
			"lastClaimedTime",
			"totalEarnedTokens",
			"getPendingDivs",
			"totalReferralFeeEarned",
			"getNumberOfHolders",
			"getStakersList",
			"getTotalPendingDivs",
			"getNumberOfReferredStakers",
			"getReferredStaker",
			"getActiveReferredStaker",
			"contractStartTime",
			"REWARD_INTERVAL",
			"rewardsPendingClaim",
			"getPendingDivs",
			"ADMIN_CAN_CLAIM_AFTER",
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"stake",
			"unstake",
			"claim",
			"reInvest",
			"stakeExternal"
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				let gas = window.config.default_gas_amount
				try {
					let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
					if (estimatedGas) {
						gas = Math.min(estimatedGas, gas)
						console.log('estimatedgas'+gas)
					}
				} catch (e) {
					console.warn(e)
				}
				return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
			}
		})
	}

	async depositTOKEN(amount, referrer) {
		let token_contract = await getContract(this.token)
		let staking_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(staking_contract._address, amount).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		batch.add(staking_contract.methods.deposit(amount, referrer).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		return batch.execute()
	}
}

class CONSTANT_STAKING_NEW {
	constructor(ticker = 'CONSTANT_STAKING_30', token = 'REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase() + '_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"stakingTime",
			"LOCKUP_TIME",
			"lastClaimedTime",
			"totalEarnedTokens",
			"getPendingDivs",
			"totalReferralFeeEarned",
			"getNumberOfHolders",
			"getStakersList",
			"getTotalPendingDivs",
			"getNumberOfReferredStakers",
			"getReferredStaker",
			"getActiveReferredStaker",
			"contractStartTime",
			"REWARD_INTERVAL",
			"rewardsPendingClaim",
			"getPendingDivs",
			"ADMIN_CAN_CLAIM_AFTER",
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"stake",
			"unstake",
			"claim",
			"reInvest",
			"stakeExternal"
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				//console.log(value)
				let gas = window.config.default_gas_amount
				// try {
				// 	let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
				// 	if (estimatedGas) {
				// 		gas = Math.min(estimatedGas, gas)
				// 		console.log('estimatedgas'+gas)
				// 	}
				// } catch (e) {
				// 	console.warn(e)
				// }
				return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
			}
		})
	}

	async depositTOKEN(amount, referrer) {
		let token_contract = await getContract(this.token)
		let staking_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(staking_contract._address, amount).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		batch.add(staking_contract.methods.deposit(amount, referrer).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		return batch.execute()
	}
}

//DYP-ETH
window.token = new TOKEN
window.staking = new STAKING
window.reward_token = new TOKEN("REWARD_TOKEN")
window.reward_token_idyp = new TOKEN("REWARD_TOKEN_IDYP")

window.REWARD_TOKEN_DYPS_ABI = window.TOKEN_ABI
window.token_dyps = new TOKEN("REWARD_TOKEN_DYPS")

window.weth = new TOKEN("WETH")

window.token_dyp_30 = new TOKEN("TOKEN_DYP30")
window.staking_dyp_30 = new STAKING("STAKING_DYP30", "TOKEN_DYP30")

window.token_dyp_60 = new TOKEN("TOKEN_DYP30")
window.staking_dyp_60 = new STAKING("STAKING_DYP60", "TOKEN_DYP60")

window.token_dyp_90 = new TOKEN("TOKEN_DYP90")
window.staking_dyp_90 = new STAKING("STAKING_DYP90", "TOKEN_DYP90")

/*buyback*/
window.buyback_staking = new BUYBACK_STAKING('BUYBACK_STAKING')
window.buyback_staking1_1 = new BUYBACK_STAKING('BUYBACK_STAKING1_1')
window.buyback_staking1_2 = new BUYBACK_STAKING('BUYBACK_STAKING1_2')

// constant staking
window.constant_staking_30 = new CONSTANT_STAKING("CONSTANT_STAKING_30")
window.constant_staking_60 = new CONSTANT_STAKING("CONSTANT_STAKING_60")

window.constant_staking_90 = new CONSTANT_STAKING("CONSTANT_STAKING_90")
window.constant_staking_120 = new CONSTANT_STAKING("CONSTANT_STAKING_120")

window.constant_staking_130 = new CONSTANT_STAKING("CONSTANT_STAKING_130")

//constant staking NEW CONTRACTS
window.constant_staking_new1 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW1")
window.constant_staking_new2 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW2")

//constant staking for Buyback New
window.constant_staking_new3 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW3")
window.constant_staking_new4 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW4")

//Constant staking DYP -> DAI
window.reward_token_dai = new TOKEN("REWARD_TOKEN_DAI")
window.constant_stakingdai = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGDAI")

/* Farming New */
window.token_new = new TOKEN("TOKEN_NEW")
window.farming_new_1 = new STAKING("FARMING_NEW_1")
window.constant_staking_new5 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW5")

window.farming_new_2 = new STAKING("FARMING_NEW_2")
window.constant_staking_new6 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW6")

window.farming_new_3 = new STAKING("FARMING_NEW_3")
window.constant_staking_new7 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW7")

window.farming_new_4 = new STAKING("FARMING_NEW_4")
window.constant_staking_new8 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW8")

window.farming_new_5 = new STAKING("FARMING_NEW_5")
window.constant_staking_new9 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGNEW_NEW9")

/* Constant Staking iDYP */
window.constant_staking_idyp_1 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGIDYP_1")
window.constant_staking_idyp_2 = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGIDYP_2")

/**
 * Returns the ETH USD Price, Token USD Prices, LP USD Prices, and amount of LP Staked, usd value of LP staked
 *
 * lp_id example: `"pair_address-pool_contract_address"`
 *
 * @param {{token_contract_addresses: object[], lp_ids: object[], tokens_disbursed_per_year: object}} props - MAKE SURE ALL ADDRESSES ARE LOWERCASE!
 */
function get_usd_values({
							token_contract_addresses,
							lp_ids,
						}) {
	return new Promise(async (resolve, reject) => {

		let usd_per_eth = await getPrice(window.config.cg_ids['main'])
		let usdPerPlatformToken = await getPrice(window.config.cg_ids['platform-token'])


		let aux_Price = usdPerPlatformToken

		let amount = new BigNumber(1000000000000000000).toFixed(0)
		let router = await window.getPangolinRouterContract()
		let WETH = await router.methods.WAVAX().call()
		let platformTokenAddress = window.config.USDCe_address
		let rewardTokenAddress = window.config.reward_token_idyp_address
		let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
		let _amountOutMin = await router.methods.getAmountsOut(amount, path).call()
		_amountOutMin = _amountOutMin[_amountOutMin.length - 1]
		_amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18)
		//console.log({_amountOutMin})


		async function getData(token_contract_addresses, lp_ids) {
			let tokens = []
			let liquidityPositions = []
			let token_price_usd = 0
			for (let id of token_contract_addresses) {
				if(id==TOKEN_ADDRESS)
					token_price_usd = await getPrice(window.config.cg_ids[id])
				else
					token_price_usd = parseFloat(_amountOutMin)
				tokens.push({id, token_price_usd})
			}

			let platformTokenContract = {}
			for (let lp_id of lp_ids) {
				let pairAddress = lp_id.split('-')[0]
				let stakingContractAddress = lp_id.split('-')[1]

				if (pairAddress == '0x66eecc97203704d9e2db4a431cb0e9ce92539d5a'){
					platformTokenContract = new window.avaxweb3.eth.Contract(window.TOKEN_ABI, window.config.reward_token_idyp_address, {from: await getCoinbase()})
					usdPerPlatformToken = _amountOutMin
				}
				else {
					platformTokenContract = new window.avaxweb3.eth.Contract(window.TOKEN_ABI, window.config.reward_token_address, {from: await getCoinbase()})
					usdPerPlatformToken = aux_Price
				}

				let pairTokenContract = new window.avaxweb3.eth.Contract(window.TOKEN_ABI, pairAddress, {from: await getCoinbase()})

				let [lpTotalSupply, stakingLpBalance, platformTokenInLp] = await Promise.all([pairTokenContract.methods.totalSupply().call(), pairTokenContract.methods.balanceOf(stakingContractAddress).call(), platformTokenContract.methods.balanceOf(pairAddress).call()])

				let usd_per_lp = platformTokenInLp / 1e18 * usdPerPlatformToken * 2  / (lpTotalSupply/1e18)
				let usd_value_of_lp_staked = stakingLpBalance/1e18*usd_per_lp
				let lp_staked = stakingLpBalance/1e18
				let id = lp_id
				liquidityPositions.push({
					id,
					usd_per_lp,
					usd_value_of_lp_staked,
					lp_staked
				})
			}
			return {data: {
				tokens, liquidityPositions
			}}
		}

		getData(token_contract_addresses.map(a => a.toLowerCase()), lp_ids.map(a => a.toLowerCase()))
			.then(res => handleTheGraphData(res))
			.catch(reject)


		function handleTheGraphData(response) {
			try {
				let data = response.data
				if (!data) return reject(response);

				console.log({data})

				let token_data = {}, lp_data = {}

				data.tokens.forEach(t => {
					token_data[t.id] = t
				})

				data.liquidityPositions.forEach(lp => {
					lp_data[lp.id] = lp
				})
				resolve({token_data, lp_data, usd_per_eth})
			} catch (e) {
				console.error(e)
				reject(e)
			}
		}
	})
}

/**
 *
 * @param {string[]} staking_pools_list - List of Contract Addresses for Staking Pools
 * @returns {number[]} List of number of stakers for each pool
 */
async function get_number_of_stakers(staking_pools_list) {
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	} finally {
		if (!coinbase) {
			return (await Promise.all(staking_pools_list.map(() => Promise.resolve(0))))
		}
	}

	return (await Promise.all(staking_pools_list.map(contract_address => {
		let contract = new window.avaxweb3.eth.Contract(window.STAKING_ABI, contract_address, {from: coinbase})
		return contract.methods.getNumberOfHolders().call()
	}))).map(h => Number(h))
}

async function get_token_balances({
									  TOKEN_ADDRESS,
									  HOLDERS_LIST
								  }) {
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	} finally {
		if (!coinbase) {
			return (await Promise.all(HOLDERS_LIST.map(() => Promise.resolve(0))))
		}
	}

	let token_contract = new window.avaxweb3.eth.Contract(window.TOKEN_ABI, TOKEN_ADDRESS, {from: coinbase})

	return (await Promise.all(HOLDERS_LIST.map(h => {
		return token_contract.methods.balanceOf(h).call()
	})))
}

function wait(ms) {
	console.log("Waiting " + ms + 'ms')
	return new Promise(r => setTimeout(() => {
		r(true)
		console.log("Wait over!")
	}, ms))
}

/**
 *
 * @param {{token_data, lp_data}} usd_values - assuming only one token is there in token_list
 */
async function get_apy_and_tvl(usd_values) {
	let {token_data, lp_data, usd_per_eth} = usd_values

	let token_price_usd = token_data[TOKEN_ADDRESS].token_price_usd*1
	let balances_by_address = {}, number_of_holders_by_address = {}
	let lp_ids = Object.keys(lp_data)
	let addrs = lp_ids.map(a => a.split('-')[1])
	let token_balances = await get_token_balances({TOKEN_ADDRESS, HOLDERS_LIST: addrs})
	addrs.forEach((addr, i) => balances_by_address[addr] = token_balances[i])

	await wait(2000)

	let number_of_holders = await get_number_of_stakers(addrs)
	addrs.forEach((addr, i) => number_of_holders_by_address[addr] = number_of_holders[i])

	lp_ids.forEach(lp_id => {
		let apy = 0, tvl_usd = 0

		let pool_address = lp_id.split('-')[1]
		let token_balance = new BigNumber(balances_by_address[pool_address] || 0)
		let token_balance_value_usd = token_balance.div(1e18).times(token_price_usd).toFixed(2)*1

		tvl_usd = token_balance_value_usd + lp_data[lp_id].usd_value_of_lp_staked*1

		apy = (TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] * token_price_usd * 100 / (lp_data[lp_id].usd_value_of_lp_staked || 1)).toFixed(2)*1

		lp_data[lp_id].apy = apy
		lp_data[lp_id].tvl_usd = tvl_usd
		lp_data[lp_id].stakers_num = number_of_holders_by_address[pool_address]
	})

	return {token_data, lp_data, usd_per_eth, token_price_usd}
}

async function refreshBalance() {

	//await wait(10000)
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	}

	let reward_token = window.reward_token
	//console.log('coinbase' + coinbase)

	let _tvl30 = await reward_token.balanceOf('0x7fc2174670d672ad7f666af0704c2d961ef32c73')
	_tvl30 = _tvl30 / 1e18

	let _tvl60 = await reward_token.balanceOf('0x036e336ea3ac2e255124cf775c4fdab94b2c42e4')
	_tvl60 = _tvl60 / 1e18

	let _tvl90 = await reward_token.balanceOf('0x0a32749d95217b7ee50127e24711c97849b70c6a')
	_tvl90 = _tvl90 / 1e18

	let _tvl120 = await reward_token.balanceOf('0x82df1450efd6b504ee069f5e4548f2d5cb229880')
	_tvl120 = _tvl120 / 1e18 + 0.1

	//console.log('tvlll+ ' + _tvl)

	let [usdPerToken] = await Promise.all([window.getPrice('defi-yield-protocol')])
	let valueee = (_tvl30 + _tvl60 + _tvl90 + _tvl120) * usdPerToken
	//console.log('usdper '+valueee)
	return valueee

}

async function get_usd_values_with_apy_and_tvl(...arguments) {
	return (await get_apy_and_tvl(await get_usd_values(...arguments)))
}


async function refresh_the_graph_result() {
	let result = await get_usd_values_with_apy_and_tvl({token_contract_addresses: [TOKEN_ADDRESS, TOKEN_IDYP_ADDRESS], lp_ids: LP_ID_LIST})
	window.the_graph_result = result
	//window.TVL_FARMING_POOLS = await refreshBalance()
	return result
}

window.get_usd_values = get_usd_values
window.get_token_balances = get_token_balances
window.get_apy_and_tvl = get_apy_and_tvl
window.get_number_of_stakers = get_number_of_stakers
window.refresh_the_graph_result = refresh_the_graph_result

window.the_graph_result_avax_v2 = {}

async function get_the_graph_avax_v2() {
	try {
		const res = await getData('https://api.dyp.finance/api/the_graph_avax_v2')
		window.the_graph_result_avax_v2 = res.the_graph_avax_v2
	} catch(err) {
		console.log(err);
	}
	return window.the_graph_result_avax_v2
}

window.get_the_graph_avax_v2 = get_the_graph_avax_v2

function getPrice(coingecko_id = 'ethereum', vs_currency = 'usd') {
	return new Promise((resolve, reject) => {
		window.$.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=${vs_currency}`)
			.then((result) => {
				resolve(result[coingecko_id][vs_currency])
			})
			.catch((error) => {
				reject(error)
			})
	})
}

window.getPrice = getPrice

function getData(ajaxurl) {
	return $.ajax({
		url: ajaxurl,
		type: 'GET',
	});
};

window.hashMapApy = {}

async function getHashMapApy() {
	try {
		const res = await getData('https://api.dyp.finance/api/getHashMapApy')
		window.hashMapApy = res
		//console.log(res)
	} catch (err) {
		console.log(err)
	}
	return window.hashMapApy
}

window.getHashMapApy = getHashMapApy

window.jsonTotalPaid = {}

async function getTotalPaidApi() {
	try {
		const res = await getData('https://api.dyp.finance/api/totalpaid')
		window.jsonTotalPaid = res
		//console.log('total paic', res)
	} catch (err) {
		console.log(err)
	}
	return window.jsonTotalPaid
}

const getTotalPaid = async () => {
	const totalPaid = await getTotalPaidApi()
	return totalPaid
}
window.getTotalPaid = getTotalPaid

/*buyback*/
async function getTokenHolderBalance(token, holder) {
	let tokenContract = new window.avaxweb3.eth.Contract(window.TOKEN_ABI, token, {from: await getCoinbase()})
	return await tokenContract.methods.balanceOf(holder).call()
}

async function approveToken(token, spender, amount) {
	let tokenContract = new window.web3.eth.Contract(window.TOKEN_ABI, token, {from: await getCoinbase()})
	return await tokenContract.methods.approve(spender, amount).send()
}

window.PANGOLIN_ROUTER_ABI=[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_WAVAX","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"WAVAX","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"amountADesired","internalType":"uint256"},{"type":"uint256","name":"amountBDesired","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidityAVAX","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"amountTokenDesired","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"}],"name":"getAmountIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"}],"name":"getAmountOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"quote","inputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"reserveA","internalType":"uint256"},{"type":"uint256","name":"reserveB","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAX","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXWithPermit","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidityWithPermit","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapAVAXForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactAVAXForTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForAVAX","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactAVAX","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]
window.UNISWAP_ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
async function getUniswapRouterContract(address=window.config.uniswap_router_address) {
	return (new window.avaxweb3.eth.Contract(window.PANGOLIN_ROUTER_ABI, address, {from: await getCoinbase()}))
}

async function getPangolinRouterContract(address=window.config.pangolin_router_address) {
	return (new window.avaxweb3.eth.Contract(window.PANGOLIN_ROUTER_ABI, address, {from: await getCoinbase()}))
}


/* iDYP check Vesting/Staking */
async function isStaking(holder, stakingAddress) {
	let tokenContract = new window.avaxweb3.eth.Contract(window.CONSTANT_STAKING_ABI, stakingAddress, {from: await getCoinbase()})
	return await tokenContract.methods.depositedTokens(holder).call()
}


/* iDYP Staking Stats V2 */

const FarmingStakingAddresses = [
	"0x035d65babf595758d7a439d5870badc44218d028-0x1ca9fc98f3b997e08bc04691414e33b1835aa7e5",
	"0x6c325dfea0d18387d423c869e328ef005cba024f-0x6a258bd17456e057a7c6102177ec2f9d64d5f9e4",
	"0x85c4f0cea0994de365dc47ba22dd0fd9899f93ab-0xc2ba0abfc89a5a258e6440d82bb95a5e2b541581",
	"0x6f5dc6777b2b4667bf183d093111867239518af5-0x4c16093da4ba7a604a1fe8cd5d387cc904b3d407",
	"0x10e105676cac55b74cb6500a8fb5d2f84804393d-0x9ff3dc1f7042baf46651029c7284fc3b93e21a4d"
]

window.FarmingStakingAddresses = FarmingStakingAddresses