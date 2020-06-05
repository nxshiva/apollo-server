## GraphQL:

- GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
- GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.
- Apps using GraphQL are fast and stable because they control the data they get, not the server. 
- GraphQL APIs are organized in terms of types and fields, not endpoints. Access the full capabilities of your data from a single endpoint.
- Once a GraphQL service is running (typically at a URL on a web service), it can receive GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.

## Difference between GraphQL and Rest:

- Data fetching with REST causes over- and under-fetching issues whereas this simply isn’t possible with GraphQL.
- The endpoint you call in REST is that object’s identity whereas, in GraphQL, the object’s identity has nothing to do with how you fetch it. In other words, in REST you define the object on Backend and on GraphQL you "define" this object on Frontend.
- With REST, the server determines the shape and size of the resource whereas, in GraphQL, the server simply declares the available resources and the client can ask for exactly what it needs.
- In GraphQL, you can traverse from the entry point to related data, following relationships defined in the schema, in a single request. In REST, you have to call multiple endpoints to fetch related resources.
- In REST, each request usually calls exactly one route handler function. In GraphQL, one query can call many resolvers to construct a nested response with multiple resources.
- REST automatically puts caching into effect whereas GraphQL has no automatic caching system.
- Error handling in REST is much simpler as compared to GraphQL which typically gives you a 200 OK status code.

## Schema:

Your GraphQL server uses a schema to describe the shape of your data graph. This schema defines a hierarchy of types with fields that are populated from your back-end data stores. The schema also specifies exactly which queries and mutations are available for clients to execute against your data graph.

##### The schema definition language:

The GraphQL specification includes a human-readable schema definition language (or SDL) that you use to define your schema and store it as a string.
```
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}
```
A schema defines a collection of types and the relationships between those types. By defining these type relationships in a unified schema, we enable client developers to see exactly what data is available and request a specific subset of that data with a single optimized query.

##### Supported types:

- Scalar types
- Object types
- The Query type
- The Mutation type
- Input types

## Resolvers:

When using graphql-tools, you define your field resolvers separately from the schema. Since the schema already describes all of the fields, arguments, and result types, the only thing left is a collection of functions that are called to actually execute these fields.

##### Resolver map:

In order to respond to queries, a schema needs to have resolvers for all fields. Resolvers are per field functions that are given a parent object, arguments, and the execution context, and are responsible for returning a result for that field. Resolvers cannot be included in the GraphQL schema language, so they must be added separately. The collection of resolvers is called the **"resolver map"**.

##### Resolver function signature:

Every resolver in a GraphQL.js schema accepts four positional arguments:

```sh
fieldName(obj, args, context, info) { result }
```

These arguments have the following meanings and conventional names:

1. **obj:** The object that contains the result returned from the resolver on the parent field, or, in the case of a top-level Query field, the rootValue passed from the server configuration. This argument enables the nested nature of GraphQL queries.
2. **args:** An object with the arguments passed into the field in the query. For example, if the field was called with author(name: "Ada"), the args object would be: { "name": "Ada" }.
3. **context:** This is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query.
4. **info:** This argument should only be used in advanced cases, but it contains information about the execution state of the query, including the field name, path to the field from the root, and more. It's only documented in the GraphQL.js source code.

##### Resolver result format:

Resolvers in GraphQL can return different kinds of results which are treated differently:

1. **null or undefined -** this indicates the object could not be found.
2. **An array -** this is only valid if the schema indicates that the result of a field should be a list. The sub-selection of the query will run once for every item in this array.
3. **A promise -** resolvers often do asynchronous actions like fetching from a database or backend API, so they can return promises. This can be combined with arrays, so a resolver can return:

- A promise that resolves an array
- An array of promises
4. **A scalar or object value -** a resolver can also return any other kind of value, which doesn't have any special meaning but is simply passed down into any nested resolvers, as described in the next section.


##### Default resolver:

You don't need to specify resolvers for every type in your schema. If you don't specify a resolver, GraphQL.js falls back to a default one, which does the following:

- Returns a property from obj with the relevant field name, or
- Calls a function on obj with the relevant field name and passes the query arguments into that function.

