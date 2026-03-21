import nextEnv from '@next/env'
import { GoogleGenAI } from '@google/genai'

const { loadEnvConfig } = nextEnv

loadEnvConfig(process.cwd())

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
	throw new Error('Missing GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY in .env.local')
}

const ai = new GoogleGenAI({ apiKey })

async function main() {
	const response = await ai.models.generateContent({
		model: 'gemini-3-flash-preview',
		contents: 'Explain how AI works in a few words',
	})

	console.log('[gemini-sample] response:')
	console.log(response.text)
}

await main()
