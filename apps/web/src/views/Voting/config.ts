import snapshot from '@snapshot-labs/snapshot.js'
import { bscTokens } from '@pancakeswap/tokens'
import { DEFAULT_ACTIVE_CHAIN_ID } from 'config/chains'
import { SNAPSHOT_BASE_URL } from 'config/constants/endpoints'

export const PROPOSALS_TO_SHOW = 10
export const ADMINS = [ 
  '0x329fC1924A8967790d4A6310eb12b0B3902D7B2F', // edit
  '0x584a7F54bEADD4d50015dAf0893e39DA6A0Fe719', // edit
  // '0x842B508681eE336E74600974B4623B709477d29D', // TARO cake.eth
  // '0x977e0c1005dff8749f8cac22f4df0bd5f013d1a7', // CHUNGUS cake.eth
  // '0xa3D2124E4023ea5c74dC749012E0B46E42bDD648', // LIME cakevote.eth
  // '0xa7551aBe0A066555cb5d859849426fB55543Ca25', // MUSTARD cakevote.eth
].map((address) => address.toLowerCase())
export const IPFS_GATEWAY = 'https://gateway.ipfs.io/ipfs'
export const SNAPSHOT_VERSION = '0.1.3'
export const PANCAKE_SPACE = 'metavote.eth' // edit "cakevote.eth"
export const VOTE_THRESHOLD = 10

export const NETWORK = DEFAULT_ACTIVE_CHAIN_ID.toString()
export const STRATEGIES = [
  { name: 'cake', params: { symbol: 'CAKE', address: bscTokens.cake.address, decimals: 18, max: 300 } }, // edit
]

export const client = new snapshot.Client712(SNAPSHOT_BASE_URL)