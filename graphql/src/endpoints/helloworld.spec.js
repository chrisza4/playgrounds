import { graphql } from 'graphql'
import { expect } from 'chai'
import { schema } from './helloworld'

describe('GraphQL Hello world', () => {
  it('should return hello for simple query', async () => {
    const result = await graphql(schema, '{ hello }')
    expect(result.data.hello).to.equal('world')
  })

  it('should return error for unknown field', async () => {
    const result = await graphql(schema, '{ hello2 }')
    expect(result.errors).to.exist
  })
})
