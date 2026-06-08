import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from './FormStore';
import type { SumbittedForm } from '@/types/SumbittedForm';

const mockFormItem1: SumbittedForm = {
  name: 'Mr. Bombastick',
  email: 'mr.bombastick@barn.com',
  age: 28,
  gender: 'Male',
  password: 'Qq1!',
  confirmPassword: 'Qq1!',
  image: 'data:image/png;base64,mockBase64',
  country: 'United States of America',
  termsAndConditions: true,
};

const mockFormItem2: SumbittedForm = {
  ...mockFormItem1,
  name: 'Roger',
  email: 'roger@barn.com',
};

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({ forms: [] });
  });

  it('should initialize with an empty forms array', () => {
    const state = useFormStore.getState();
    expect(state.forms).toEqual([]);
  });

  it('should add a form item to the empty store', () => {
    useFormStore.getState().addForm(mockFormItem1);

    const state = useFormStore.getState();
    expect(state.forms).toHaveLength(1);
    expect(state.forms[0]).toEqual(mockFormItem1);
  });

  it('should append items to the forms array without overwriting existing data', () => {
    useFormStore.getState().addForm(mockFormItem1);
    useFormStore.getState().addForm(mockFormItem2);

    const state = useFormStore.getState();
    expect(state.forms).toHaveLength(2);
    expect(state.forms[0]).toEqual(mockFormItem1);
    expect(state.forms[1]).toEqual(mockFormItem2);
  });
});
