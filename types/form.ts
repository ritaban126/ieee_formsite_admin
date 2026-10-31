export type FieldType =
  | 'short'
  | 'long'
  | 'email'
  | 'phone'
  | 'number'
  | 'dropdown'
  | 'multiple'
  | 'checkboxes'
  | 'date'
  | 'file'
  | 'yesno'
  | 'heading'
  | 'description';

export interface FormOption {
  id: string;
  label: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: FormOption[];
  defaultValue?: string;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormBuilderState {
  title: string;
  sections: FormSection[];
}
