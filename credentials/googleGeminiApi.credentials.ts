import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class GoogleGeminiApi implements ICredentialType {
	name = 'googleGeminiApi';
	displayName = 'Google Gemini API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			required: true,
		},
	];
}
