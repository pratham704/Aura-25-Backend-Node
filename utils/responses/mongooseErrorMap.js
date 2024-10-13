// utils/responses/mongooseErrorMap.js

export const mongooseErrorMap = {
    '11000': { status: 409, message: 'Duplicate key error.' }, // Duplicate key error
    '11001': { status: 409, message: 'Duplicate key error with additional details.' }, // Another type of duplicate key error
    '11600': { status: 500, message: 'An internal MongoDB error occurred.' }, // Internal server error
    '121': { status: 400, message: 'Index with name already exists.' }, // Index already exists
    '12500': { status: 400, message: 'Cannot perform the operation on the collection.' }, // Collection-related operation limit exceeded
    '13000': { status: 500, message: 'Internal server error during an operation.' }, // Internal server error
    '13600': { status: 500, message: 'Server is under load.' }, // Server is under load
    '14300': { status: 503, message: 'Resource is unavailable due to high load.' }, // High load resource unavailability
    '16000': { status: 400, message: 'Transaction limit exceeded.' }, // Transaction limit exceeded
    '17000': { status: 500, message: 'Unknown server error.' }, // Unknown server error
    '18000': { status: 400, message: 'Operation exceeding limit.' }, // Operation exceeding limit
    '19000': { status: 500, message: 'Internal MongoDB error.' }, // Internal MongoDB error
    '100': { status: 400, message: 'Cannot use this method.' }, // Cannot use this method
    '101': { status: 500, message: 'Database not found.' }, // Database not found
    '102': { status: 500, message: 'Invalid database name.' }, // Invalid database name
    '103': { status: 500, message: 'Database already exists.' }, // Database already exists
    '104': { status: 500, message: 'Collection not found.' }, // Collection not found
    '105': { status: 400, message: 'Invalid collection name.' }, // Invalid collection name
    '106': { status: 500, message: 'Collection already exists.' }, // Collection already exists
    '107': { status: 400, message: 'Cannot perform this operation.' }, // Cannot perform this operation
    '108': { status: 400, message: 'Invalid operation.' }, // Invalid operation
    '109': { status: 400, message: 'Operation not supported.' }, // Operation not supported
    '112': { status: 500, message: 'Server is not reachable.' }, // Server is not reachable
    '113': { status: 500, message: 'Network error.' }, // Network error
    '114': { status: 500, message: 'Write conflict.' }, // Write conflict
    '115': { status: 500, message: 'Read preference error.' }, // Read preference error
    '117': { status: 500, message: 'Cursor not found.' }, // Cursor not found
    '118': { status: 500, message: 'Operation time out.' }, // Operation time out
    '119': { status: 400, message: 'Invalid query.' }, // Invalid query
    '120': { status: 400, message: 'Query field not found.' }, // Query field not found
    '122': { status: 400, message: 'Invalid index specification.' }, // Invalid index specification
    '123': { status: 500, message: 'Index build failed.' }, // Index build failed
    '124': { status: 500, message: 'Index build interrupted.' }, // Index build interrupted
    '127': { status: 500, message: 'Server error.' }, // Server error
    '128': { status: 500, message: 'Unknown database error.' }, // Unknown database error
    '130': { status: 500, message: 'Query execution error.' }, // Query execution error
    '131': { status: 500, message: 'Sharding error.' }, // Sharding error
    '132': { status: 500, message: 'Replication error.' }, // Replication error
    '133': { status: 500, message: 'Authorization error.' }, // Authorization error
    '134': { status: 500, message: 'Authentication error.' }, // Authentication error
    '135': { status: 500, message: 'Command error.' }, // Command error
    '136': { status: 500, message: 'Operation not permitted.' }, // Operation not permitted
    '137': { status: 500, message: 'Database version mismatch.' }, // Database version mismatch
    '138': { status: 500, message: 'Replica set configuration error.' }, // Replica set configuration error
    '139': { status: 500, message: 'Invalid replica set member.' }, // Invalid replica set member
    '140': { status: 500, message: 'Failed to write to journal.' }, // Failed to write to journal

    // Common Mongoose Errors
    CastError: { status: 400, message: 'Invalid data type.' },
    ValidationError: { status: 400, message: 'Validation error.' },
    MongoServerError: { status: 500, message: 'MongoDB server error.' },
    MongoNetworkError: { status: 503, message: 'Network error while connecting to MongoDB.' },
    MongoTimeoutError: { status: 504, message: 'Connection to MongoDB timed out.' },
    MongoError: { status: 500, message: 'MongoDB error occurred.' },
    DocumentNotFoundError: { status: 404, message: 'Document not found.' },
    DivergentArrayError: { status: 400, message: 'Array divergence error.' },
    OverwriteModelError: { status: 500, message: 'Model overwrite error.' },
    AggregationCursorClosedError: { status: 500, message: 'Aggregation cursor closed error.' },
    AggregationError: { status: 500, message: 'Aggregation error.' },
    ConnectionError: { status: 503, message: 'Connection error.' },
    ConnectionTimeoutError: { status: 504, message: 'Connection timeout error.' },
    TransactionError: { status: 500, message: 'Transaction error.' },
    TransactionCommitError: { status: 500, message: 'Transaction commit error.' },
    TransactionAbortError: { status: 500, message: 'Transaction abort error.' },
    ChangeStreamError: { status: 500, message: 'Change stream error.' },
    ServerSelectionError: { status: 500, message: 'Server selection error.' },
    ServerError: { status: 500, message: 'Server error.' },
    MongooseError: { status: 500, message: 'Mongoose error occurred.' },
    StrictModeError: { status: 400, message: 'Strict mode error.' },

    // General Errors
    GeneralError: { status: 500, message: 'An unknown error occurred.' }
};