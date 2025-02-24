import AWS from 'aws-sdk';

interface TableDefinition {
  TableName: string;
  KeySchema: AWS.DynamoDB.KeySchemaElement[];
  AttributeDefinitions: AWS.DynamoDB.AttributeDefinition[];
  ProvisionedThroughput: AWS.DynamoDB.ProvisionedThroughput;
}

const dynamoDb = new AWS.DynamoDB({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

const tables: TableDefinition[] = [
  {
    TableName: 'CreditBehavior',
    KeySchema: [{ AttributeName: 'nadroCode', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'nadroCode', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
];

const createTables = async (): Promise<void> => {
  for (const table of tables) {
    try {
      console.log(`Creating table: ${table.TableName}`);
      await dynamoDb.createTable(table).promise();
      console.log(`Table created: ${table.TableName}`);
    } catch (error: any) {
      if (error.code === 'ResourceInUseException') {
        console.log(`Table already exists: ${table.TableName}`);
      } else {
        console.error(`Failed to create table ${table.TableName}`, error);
      }
    }
  }
};

createTables();
