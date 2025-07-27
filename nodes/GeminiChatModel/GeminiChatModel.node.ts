import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import type {
	INodeType,
	INodeTypeDescription,
	ISupplyDataFunctions,
	SupplyData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class GeminiChatModel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gemini Chat Model',
		name: 'geminiChatModel',
		icon: 'file:google.svg',
		group: ['transform'],
		version: 1,
		description: 'Provides a Gemini Chat Model for Langchain AI Agent Node',
		defaults: {
			name: 'Gemini Chat Model',
		},
		inputs: [],
		outputs: [NodeConnectionType.AiLanguageModel],
		outputNames: ['Model'],
		credentials: [
			{
				name: 'googleGeminiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Model',
				name: 'modelName',
				type: 'options',
				description: 'The model which will generate the completion.',
				options: [
					{ name: 'gemini-pro', value: 'gemini-pro' },
					{ name: 'gemini-1.5-flash', value: 'gemini-1.5-flash' },
					{ name: 'gemini-1.5-pro', value: 'gemini-1.5-pro' },
				],
				default: 'gemini-pro',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 0.7,
				description: 'Controls the randomness of the output. Higher values mean more random.',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					stepSize: 0.1,
				},
			},
			{
				displayName: 'Max Output Tokens',
				name: 'maxOutputTokens',
				type: 'number',
				default: 1024,
				description: 'The maximum number of tokens to generate in the completion.',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Top K',
				name: 'topK',
				type: 'number',
				default: 40,
				description: 'The maximum number of tokens to consider for each step.',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Top P',
				name: 'topP',
				type: 'number',
				default: 0.9,
				description: 'The cumulative probability of tokens to consider for each step.',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					stepSize: 0.1,
				},
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('googleGeminiApi');
		const apiKey = credentials.apiKey as string;

		const modelName = this.getNodeParameter('modelName', itemIndex) as string;
		const temperature = this.getNodeParameter('temperature', itemIndex) as number;
		const maxOutputTokens = this.getNodeParameter('maxOutputTokens', itemIndex) as number;
		const topK = this.getNodeParameter('topK', itemIndex) as number;
		const topP = this.getNodeParameter('topP', itemIndex) as number;

		const model = new ChatGoogleGenerativeAI({
			apiKey,
			model: modelName,
			temperature,
			maxOutputTokens,
			topK,
			topP,
		});

		return {
			response: model,
		};
	}
}
