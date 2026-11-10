export interface ReferenceContextRule {
  id: string;
  category: string;
  sourceDescription: string;
  exemplarInput: string;
  exemplarOutput: string;
  exemplarInText: string;
  notes?: string;
  isCustom?: boolean;
}

export interface UniversityBlueprint {
  id: string;
  name: string;
  standard: string;
  institutionName: string;
  generalInstructions: string;
  rules: ReferenceContextRule[];
}

export interface FormattedMetadata {
  authors?: string[];
  year?: string;
  title?: string;
  sourceOrJournal?: string;
  volumeIssuePages?: string;
  publisherOrUrl?: string;
  accessDate?: string;
  doi?: string;
  edition?: string;
}

export interface FormattedReferenceResult {
  id: string;
  originalText: string;
  harvardCitation: string;
  harvardCitationPlain: string;
  inTextCitation: string;
  narrativeCitation: string;
  sourceType: string;
  confidenceScore: number;
  metadata: FormattedMetadata;
  matchedRuleId?: string;
  formattingNotes: string[];
}

export interface FormatRequestPayload {
  rawInput: string;
  customRules?: ReferenceContextRule[];
  universityGuidelines?: string;
}

export interface FormatResponsePayload {
  results: FormattedReferenceResult[];
  success: boolean;
  message?: string;
}
