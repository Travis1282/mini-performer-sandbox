export interface CustomFieldValuesParent {
  customField: CustomField;
  fieldId: number;
  fieldValue: string;
  id: number;
}

export interface CustomField {
  attributeName: CustomFieldAttributes;
  id: number;
  name: string;
}

type CustomFieldAttributes = 'categoryContent' | 'dynamicPerformerContent';
