/**
 * AXAG attribute data — all 15+ axag-* attributes with descriptions, types, and enums.
 */

export interface AxagAttributeInfo {
  description: string;
  valueType: 'string' | 'enum' | 'boolean' | 'json-array' | 'json-object';
  enum?: string[];
  required: boolean;
  detail?: string;
}

export const AXAG_ATTRIBUTES: Record<string, AxagAttributeInfo> = {
  'axag-intent': {
    description: 'Semantic intent in entity.verb format (e.g., product.search)',
    valueType: 'string',
    required: true,
    detail: 'The primary identifier for this operation. Must follow the pattern `entity.action` using snake_case.',
  },
  'axag-entity': {
    description: 'Domain entity this operation acts on (e.g., product, cart, user)',
    valueType: 'string',
    required: true,
    detail: 'The domain object affected by the operation. Use singular, lowercase, snake_case.',
  },
  'axag-action-type': {
    description: 'Type of operation',
    valueType: 'enum',
    enum: ['read', 'write', 'delete', 'navigate'],
    required: true,
    detail: '`read` — retrieves data. `write` — creates or updates. `delete` — removes. `navigate` — moves user to another view.',
  },
  'axag-description': {
    description: 'Human-readable description of the operation',
    valueType: 'string',
    required: false,
    detail: 'A concise, clear sentence describing what this operation does.',
  },
  'axag-risk-level': {
    description: 'Risk classification for this operation',
    valueType: 'enum',
    enum: ['none', 'low', 'medium', 'high', 'critical'],
    required: false,
    detail: '`none` — no side effects. `low` — easily reversible. `medium` — reversible with effort. `high` — difficult to reverse. `critical` — irreversible.',
  },
  'axag-confirmation-required': {
    description: 'Whether human confirmation is required before execution',
    valueType: 'boolean',
    enum: ['true', 'false'],
    required: false,
    detail: 'When true, agents MUST prompt the user for confirmation before invoking this operation.',
  },
  'axag-approval-required': {
    description: 'Whether role-based approval is required',
    valueType: 'boolean',
    enum: ['true', 'false'],
    required: false,
    detail: 'When true, the operation requires approval from a user with a specific role. Use with `axag-approval-roles`.',
  },
  'axag-approval-roles': {
    description: 'JSON array of roles authorized to approve (e.g., \'["admin","finance_manager"]\')',
    valueType: 'json-array',
    required: false,
    detail: 'A JSON string containing an array of role names. Only users with these roles can approve the operation.',
  },
  'axag-idempotent': {
    description: 'Whether this operation is safe to retry (true/false)',
    valueType: 'boolean',
    enum: ['true', 'false'],
    required: false,
    detail: 'When true, invoking this operation multiple times with the same parameters produces the same result.',
  },
  'axag-scope': {
    description: 'Operational boundary',
    valueType: 'enum',
    enum: ['user', 'tenant', 'global'],
    required: false,
    detail: '`user` — affects only the current user. `tenant` — affects the user\'s organization. `global` — affects all users.',
  },
  'axag-required-parameters': {
    description: 'JSON array of required parameter definitions',
    valueType: 'json-array',
    required: false,
    detail: 'A JSON string containing an array of parameter objects: `[{"name":"query","type":"string","description":"Search term"}]`',
  },
  'axag-optional-parameters': {
    description: 'JSON array of optional parameter definitions',
    valueType: 'json-array',
    required: false,
    detail: 'Same format as required-parameters but for optional inputs.',
  },
  'axag-side-effects': {
    description: 'JSON array of observable side effects (e.g., \'["email_sent","inventory_deducted"]\')',
    valueType: 'json-array',
    required: false,
    detail: 'Declares what happens beyond the primary operation. Agents use this to inform users of consequences.',
  },
  'axag-preconditions': {
    description: 'JSON array of required state before execution',
    valueType: 'json-array',
    required: false,
    detail: 'Conditions that MUST be true before the operation can execute (e.g., `["cart_not_empty"]`).',
  },
  'axag-postconditions': {
    description: 'JSON array of guaranteed state after execution',
    valueType: 'json-array',
    required: false,
    detail: 'Conditions guaranteed to be true after successful execution (e.g., `["order_created"]`).',
  },
};

/**
 * Get all attribute names as an array.
 */
export function getAttributeNames(): string[] {
  return Object.keys(AXAG_ATTRIBUTES);
}

/**
 * Get info for a specific attribute.
 */
export function getAttributeInfo(name: string): AxagAttributeInfo | undefined {
  return AXAG_ATTRIBUTES[name];
}
