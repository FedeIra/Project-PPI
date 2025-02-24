import { Key } from 'aws-sdk/clients/dynamodb'
import { CustomerFormType } from './CustomerForm.type'

export type CustomerFormListType = {
    items: CustomerFormType[],
    lastEvaluatedKey: Key | null
}