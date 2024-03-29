import { UUID } from '@opencrvs/commons'
import {
  Bundle,
  Composition,
  DocumentReference,
  Encounter,
  Observation,
  Patient,
  RelatedPerson,
  ResourceIdentifier,
  Saved,
  StrictBundle,
  Task,
  TrackingID,
  URLReference,
  URNReference
} from '@opencrvs/commons/types'

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */

export const deathTaskMock = {
  resourceType: 'Task',
  status: 'ready',
  code: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/types',
        code: 'DEATH'
      }
    ]
  },
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/paper-form-id',
      value: '12345678'
    },
    {
      system: 'http://opencrvs.org/specs/id/death-tracking-id',
      value: 'B5WGYJE'
    }
  ],
  focus: {
    reference: 'Composition/df3fb104-4c2c-486f-97b3-edbeabcd4422'
  },
  lastModified: '2018-11-29T15:11:13.041+00:00',
  businessStatus: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/status',
        code: 'DECLARED'
      }
    ]
  },
  extension: [
    {
      url: 'http://opencrvs.org/specs/extension/contact-person',
      valueString: 'MOTHER'
    },
    {
      url: 'http://opencrvs.org/specs/extension/regLastOffice',
      valueReference: { reference: '123' }
    },
    {
      url: 'http://opencrvs.org/specs/extension/regLastLocation',
      valueReference: { reference: '123' }
    }
  ],
  id: '104ad8fd-e7b8-4e3e-8193-abc2c473f2c9'
}
export const deathTaskMockJSON = JSON.stringify(deathTaskMock)

export const testFhirBundle: StrictBundle<
  [Composition, Task, Patient, Patient, Patient, RelatedPerson]
> = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: {
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '0ab5e4cd-a49b-4bf3-b03a-08b2e65e642a'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'birth-declaration'
            }
          ],
          text: 'Birth Declaration'
        },
        class: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-classes',
              code: 'crvs-document'
            }
          ],
          text: 'CRVS Document'
        },
        subject: {},
        date: '2018-05-23T14:44:58+02:00',
        author: [],
        title: 'Birth Declaration',
        section: [
          {
            title: 'Child details',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'child-details'
                }
              ],
              text: 'Child details'
            },
            entry: [
              {
                reference:
                  'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference
              }
            ]
          },
          {
            title: "Mother's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'mother-details'
                }
              ],
              text: "Mother's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference
              }
            ]
          },
          {
            title: "Father's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'father-details'
                }
              ],
              text: "Father's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:b9044443-c708-4977-b0e7-7e51ef0c9221' as URNReference
              }
            ]
          },
          {
            title: "Informant's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'informant-details'
                }
              ],
              text: "Informant's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:b9044443-4977-4912-b0e7-4977b0e7' as URNReference
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9' as URNReference,
      resource: {
        resourceType: 'Task',
        status: 'ready',
        intent: 'order',
        lastModified: '2018-11-29T15:11:13.041+00:00',
        encounter: { reference: 'Encounter/123' },
        businessStatus: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/reg-status',
              code: 'DECLARED'
            }
          ]
        },
        focus: {
          reference: 'urn:uuid:888' as URNReference
        },
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'BIRTH'
            }
          ]
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/paper-form-id',
            value: '12345678'
          },
          {
            system: 'http://opencrvs.org/specs/id/birth-tracking-id',
            value: 'B5WGYJE' as TrackingID
          }
        ],
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          },
          {
            url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
            valueString: '+8801622688231'
          },
          {
            url: 'http://opencrvs.org/specs/extension/regLastOffice',
            valueReference: { reference: '123' }
          },
          {
            url: 'http://opencrvs.org/specs/extension/regLastLocation',
            valueReference: { reference: 'Location/123' as `Location/${UUID}` }
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [
          {
            family: ['অনিক'],
            given: ['অনিক'],
            use: 'bn'
          }
        ],
        gender: 'male'
      }
    },
    {
      fullUrl: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jane'],
            family: ['Doe'],
            use: 'bn'
          }
        ],
        gender: 'female',
        telecom: [
          {
            system: 'phone',
            value: '+8801622688231'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:b9044443-c708-4977-b0e7-7e51ef0c9221' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jack'],
            family: ['Doe'],
            use: 'en'
          }
        ],
        gender: 'male'
      }
    },
    {
      fullUrl: 'urn:uuid:b9044443-4977-4912-b0e7-4977b0e7' as URNReference,
      resource: {
        resourceType: 'RelatedPerson',
        active: true,
        patient: {
          reference:
            'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference
        }
      }
    }
  ]
}

export const testFhirBundleWithIds = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: {
        id: '111',
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '0ab5e4cd-a49b-4bf3-b03a-08b2e65e642a'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'birth-declaration'
            }
          ],
          text: 'Birth Declaration'
        },
        class: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-classes',
              code: 'crvs-document'
            }
          ],
          text: 'CRVS Document'
        },
        subject: {},
        date: '2018-05-23T14:44:58+02:00',
        author: [],
        title: 'Birth Declaration',
        section: [
          {
            title: 'Child details',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'child-details'
                }
              ],
              text: 'Child details'
            },
            entry: [
              {
                reference:
                  'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference
              }
            ]
          },
          {
            title: "Mother's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'mother-details'
                }
              ],
              text: "Mother's details"
            },
            entry: [
              {
                reference: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57'
              }
            ]
          },
          {
            title: "Father's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'father-details'
                }
              ],
              text: "Father's details"
            },
            entry: [
              {
                reference: 'urn:uuid:b9044443-c708-4977-b0e7-7e51ef0c9221'
              }
            ]
          },
          {
            title: 'Certificates',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/specs/sections',
                  code: 'certificates'
                }
              ],
              text: 'Certificates'
            },
            entry: [
              {
                reference: 'urn:uuid:p9044443-c708-4977-b0e7-7e51e60c9221'
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9',
      resource: {
        id: '222',
        resourceType: 'Task',
        status: 'ready',
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'birth-registration'
            }
          ]
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/paper-form-id',
            value: '12345678'
          },
          {
            system: 'http://opencrvs.org/specs/id/birth-tracking-id',
            value: 'B5WGYJE'
          }
        ],
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662',
      resource: {
        id: '333',
        resourceType: 'Patient',
        active: true,
        name: [
          {
            family: ['অনিক'],
            given: ['অনিক'],
            use: 'bn'
          }
        ],
        gender: 'male'
      }
    },
    {
      fullUrl: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57',
      resource: {
        id: '444',
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jane'],
            family: ['Doe']
          }
        ],
        gender: 'female',
        telecom: [
          {
            system: 'phone',
            value: '+8801622688231'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:b9044443-c708-4977-b0e7-7e51ef0c9221',
      resource: {
        id: '555',
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jack'],
            family: ['Doe']
          }
        ],
        gender: 'male'
      }
    },
    {
      fullUrl: 'urn:uuid:p9044443-c708-4977-b0e7-7e51e60c9221',
      resource: {
        id: '555',
        resourceType: 'DocumentReference',
        content: [
          {
            attachment: {
              contentType: 'application/pdf',
              data: '/ocrvs/1a1af870-3e2a-4ec6-a879-085c4ad033ce.pdf'
            }
          }
        ]
      }
    }
  ]
}

export const testFhirBundleWithIdsForDeath = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: {
        id: '111',
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '0ab5e4cd-a49b-4bf3-b03a-08b2e65e642a' as UUID
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'death-declaration'
            }
          ],
          text: 'Death Declaration'
        },
        class: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-classes',
              code: 'crvs-document'
            }
          ],
          text: 'CRVS Document'
        },
        subject: {},
        date: '2018-05-23T14:44:58+02:00',
        author: [],
        title: 'Death Declaration',
        section: [
          {
            title: 'Deceased details',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'deceased-details'
                }
              ],
              text: 'Deceased details'
            },
            entry: [
              {
                reference:
                  'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference
              }
            ]
          },
          {
            title: "Informant's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'informant-details'
                }
              ],
              text: "Informant's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:43b3d0b4-2749-4494-a15d-2ad6051217bc' as URNReference
              }
            ]
          },
          {
            title: 'Certificates',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/specs/sections',
                  code: 'certificates'
                }
              ],
              text: 'Certificates'
            },
            entry: [
              {
                reference:
                  'urn:uuid:p9044443-c708-4977-b0e7-7e51e60c9221' as URNReference
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9' as URNReference,
      resource: {
        id: '222',
        resourceType: 'Task',
        status: 'ready',
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'DEATH'
            }
          ]
        },
        lastModified: '2018-11-29T15:11:13.041+00:00',
        businessStatus: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/reg-status',
              code: 'REGISTERED'
            }
          ]
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/death-tracking-id',
            value: 'D5WGYJE' as TrackingID
          }
        ],
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          },
          {
            url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
            valueString: '+8801818181818'
          },
          {
            url: 'http://opencrvs.org/specs/extension/regLastOffice',
            valueReference: { reference: 'Location/123' }
          },
          {
            url: 'http://opencrvs.org/specs/extension/regLastLocation',
            valueReference: { reference: 'Location/123' }
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference,
      resource: {
        id: '333',
        resourceType: 'Patient',
        active: true,
        name: [
          {
            family: ['অনিক'],
            given: ['অনিক'],
            use: 'bn'
          }
        ],
        gender: 'male'
      }
    },
    {
      fullUrl: 'urn:uuid:43b3d0b4-2749-4494-a15d-2ad6051217bc' as URNReference,
      resource: {
        resourceType: 'RelatedPerson',
        relationship: {
          coding: [
            {
              system:
                'http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype',
              code: 'OTHER'
            }
          ],
          text: 'Nephew'
        },
        patient: {
          reference:
            'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference
        }
      }
    },
    {
      fullUrl: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference,
      resource: {
        id: '444',
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jane'],
            family: ['Doe'],
            use: 'bn'
          }
        ],
        gender: 'female',
        telecom: [
          {
            system: 'phone',
            value: '+8801622688231'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:p9044443-c708-4977-b0e7-7e51e60c9221' as URNReference,
      resource: {
        id: '555' as UUID,
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/documentType',
              code: 'PROOF_OF_PAYMENT'
            }
          ]
        },
        status: 'current',
        resourceType: 'DocumentReference',
        content: [
          {
            attachment: {
              contentType: 'application/pdf',
              data: '/ocrvs/1a1af870-3e2a-4ec6-a879-085c4ad033ce.pdf'
            }
          }
        ]
      }
    }
  ]
} satisfies Bundle<
  Composition | Task | Patient | RelatedPerson | DocumentReference
>

export const testFhirTaskBundle: Saved<Bundle<Task>> = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl:
        'http://localhost:3447/fhir/Task/ba0412c6-5125-4447-bd32-fb5cf336ddbc' as URLReference,
      resource: {
        resourceType: 'Task',
        status: 'ready',
        intent: 'order',
        lastModified: '2018-11-29T15:11:13.041+00:00',
        encounter: { reference: 'Encounter/123' },
        code: {
          coding: [{ system: 'http://opencrvs.org/specs/types', code: 'BIRTH' }]
        },
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          },
          {
            url: 'http://opencrvs.org/specs/extension/regLastUser',
            valueReference: { reference: 'DUMMY' as ResourceIdentifier }
          }
        ],
        note: [
          {
            text: 'reason=Misspelling&comment=CHild name was misspelled',
            time: '2018-11-28T15:13:57.492Z',
            authorString: ''
          }
        ],
        focus: {
          reference:
            'Composition/df3fb104-4c2c-486f-97b3-edbeabcd4422' as ResourceIdentifier
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/birth-tracking-id',
            value: 'B1mW7jA' as TrackingID
          }
        ],
        businessStatus: {
          coding: [
            { system: 'http://opencrvs.org/specs/reg-status', code: 'DECLARED' }
          ]
        },
        meta: {
          lastUpdated: '2018-11-29T15:11:13.041+00:00',
          versionId: 'f2efacc4-b00c-4ee9-a9f0-4a33870e64ae'
        },
        id: 'ba0412c6-5125-4447-bd32-fb5cf336ddbc' as UUID
      }
    }
  ]
}

export const testDeathFhirTaskBundle = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl:
        'http://localhost:3447/fhir/Task/ba0412c6-5125-4447-bd32-fb5cf336ddbc',
      resource: {
        id: '222',
        resourceType: 'Task',
        status: 'ready',
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'DEATH'
            }
          ]
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/death-tracking-id',
            value: 'D5WGYJE'
          }
        ],
        businessStatus: {
          coding: [
            { system: 'http://opencrvs.org/specs/reg-status', code: 'REJECTED' }
          ]
        }
      }
    }
  ]
}

export const taskResourceMock = JSON.stringify({
  resourceType: 'Task',
  status: 'ready',
  code: {
    coding: [{ system: 'http://opencrvs.org/specs/types', code: 'BIRTH' }]
  },
  extension: [
    {
      url: 'http://opencrvs.org/specs/extension/contact-person',
      valueString: 'MOTHER'
    },
    {
      url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
      valueString: '+8801818181818'
    },
    {
      url: 'http://opencrvs.org/specs/extension/regLastUser',
      valueReference: { reference: 'DUMMY' }
    },
    {
      url: 'http://opencrvs.org/specs/extension/regLastOffice',
      valueReference: { reference: '123' }
    },
    {
      url: 'http://opencrvs.org/specs/extension/regLastLocation',
      valueReference: { reference: '123' }
    }
  ],
  note: [
    {
      text: 'reason=Misspelling&comment=CHild name was misspelled',
      time: '2018-11-28T15:13:57.492Z',
      authorString: ''
    }
  ],
  focus: {
    reference: 'Composition/df3fb104-4c2c-486f-97b3-edbeabcd4422'
  },
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/birth-tracking-id',
      value: 'B1mW7jA'
    }
  ],
  businessStatus: {
    coding: [
      { system: 'http://opencrvs.org/specs/reg-status', code: 'DECLARED' }
    ]
  },
  meta: {
    lastUpdated: '2018-11-29T15:11:13.041+00:00',
    versionId: 'f2efacc4-b00c-4ee9-a9f0-4a33870e64ae'
  },
  id: 'ba0412c6-5125-4447-bd32-fb5cf336ddbc'
})

export const userMock = JSON.stringify({
  mobile: '+880711111111'
})

export const fieldAgentPractitionerMock = JSON.stringify({
  resourceType: 'Bundle',
  id: 'eacae600-a501-42d6-9d59-b8b94f3e50c1',
  meta: { lastUpdated: '2018-11-27T17:13:20.662+00:00' },
  type: 'searchset',
  total: 1,
  link: [
    {
      relation: 'self',
      url: 'http://localhost:3447/fhir/Practitioner?telecom=phone%7C01711111111'
    }
  ],
  entry: [
    {
      fullUrl:
        'http://localhost:3447/fhir/Practitioner/b1f46aba-075d-431e-8aeb-ebc57a4a0ad0',
      resource: {
        resourceType: 'Practitioner',
        identifier: [
          { use: 'official', system: 'mobile', value: '01711111111' }
        ],
        telecom: [{ system: 'phone', value: '01711111111' }],
        name: [
          { use: 'en', family: 'Al Hasan', given: ['Shakib'] },
          { use: 'bn', family: '', given: [''] }
        ],
        gender: 'male',
        meta: {
          lastUpdated: '2018-11-25T17:31:08.062+00:00',
          versionId: '7b21f3ac-2d92-46fc-9b87-c692aa81c858'
        },
        id: 'e0daf66b-509e-4f45-86f3-f922b74f3dbf'
      }
    }
  ]
})

export const fieldAgentPractitionerRoleMock = JSON.stringify({
  entry: [
    {
      fullUrl:
        'http://localhost:3447/fhir/PractitionerRole/9c8b8ac2-9044-4b66-8d31-07c5a4b4348d',
      resource: {
        resourceType: 'PractitionerRole',
        practitioner: {
          reference: 'Practitioner/e0daf66b-509e-4f45-86f3-f922b74f3dbf'
        },
        code: [
          {
            coding: [
              {
                system: 'http://opencrvs.org/specs/roles',
                code: 'FIELD_AGENT'
              }
            ]
          }
        ],
        location: [
          {
            reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacd9173'
          },
          {
            reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacdxxx'
          },
          {
            reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacdy48y'
          },
          {
            reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacd12yy'
          }
        ],
        meta: {
          lastUpdated: '2018-11-25T17:31:08.096+00:00',
          versionId: '2f79ee2d-3b78-4c90-91d8-278e4a28caf7'
        },
        id: '9c8b8ac2-9044-4b66-8d31-07c5a4b4348d'
      }
    }
  ]
})

export const districtMock = JSON.stringify({
  resourceType: 'Location',
  id: 'd33e4cb2-670e-4564-a8ed-c72baacd9173',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/geo-id',
      value: '165'
    },
    { system: 'http://opencrvs.org/specs/id/bbs-code', value: '10' },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'DISTRICT'
    }
  ],
  physicalType: {
    coding: [
      {
        code: 'area',
        display: 'Jurisdiction'
      }
    ]
  }
})

export const upazilaMock = JSON.stringify({
  resourceType: 'Location',
  id: 'd33e4cb2-670e-4564-a8ed-c72baacdxxx',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/geo-id',
      value: '165'
    },
    { system: 'http://opencrvs.org/specs/id/bbs-code', value: '34' },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'UPAZILA'
    }
  ],
  partOf: {
    reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacd9173'
  },
  physicalType: {
    coding: [
      {
        code: 'area',
        display: 'Jurisdiction'
      }
    ]
  }
})

export const unionMock = JSON.stringify({
  resourceType: 'Location',
  id: 'd33e4cb2-670e-4564-a8ed-c72baacdy48y',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/geo-id',
      value: '165'
    },
    { system: 'http://opencrvs.org/specs/id/bbs-code', value: '21' },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'UNION'
    }
  ],
  partOf: {
    reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacdxxx'
  },
  physicalType: {
    coding: [
      {
        code: 'area',
        display: 'Jurisdiction'
      }
    ]
  }
})

export const officeMock = JSON.stringify({
  resourceType: 'Location',
  id: 'd33e4cb2-670e-4564-a8ed-c72baacd12yy',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/geo-id',
      value: '165'
    },
    { system: 'http://opencrvs.org/specs/id/bbs-code', value: '21' },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'CRVS_OFFICE'
    }
  ],
  partOf: {
    reference: 'Location/d33e4cb2-670e-4564-a8ed-c72baacdy48y'
  },
  type: {
    coding: [{ code: 'CRVS_OFFICE' }]
  },
  name: 'Dummy CRVS Office',
  alias: ['নকল অফিস'],
  physicalType: {
    coding: [
      {
        code: 'bu',
        display: 'Building'
      }
    ]
  }
})

export const stateMock = JSON.stringify({
  resourceType: 'Location',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/statistical-code',
      value: 'ADMIN_STRUCTURE_AWn3s2RqgAN'
    },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'STATE'
    }
  ],
  name: 'Central',
  alias: ['Central'],
  description: 'AWn3s2RqgAN',
  status: 'active',
  mode: 'instance',
  partOf: {
    reference: 'Location/0'
  },
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/location-type',
        code: 'ADMIN_STRUCTURE'
      }
    ]
  },
  physicalType: {
    coding: [
      {
        code: 'jdn',
        display: 'Jurisdiction'
      }
    ]
  },
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/location-boundary-geojson',
      valueAttachment: {
        contentType: 'application/geo+json',
        data: '<base64>'
      }
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-male-populations',
      valueString:
        '[{"2007":20000},{"2008":20000},{"2009":20000},{"2010":20000},{"2011":20000},{"2012":20000},{"2013":20000},{"2014":20000},{"2015":20000},{"2016":20000},{"2017":20000},{"2018":20000},{"2019":20000},{"2020":20000},{"2021":20000},{"2022":30000},{"2023":40000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-female-populations',
      valueString:
        '[{"2007":20000},{"2008":20000},{"2009":20000},{"2010":20000},{"2011":20000},{"2012":20000},{"2013":20000},{"2014":20000},{"2015":20000},{"2016":20000},{"2017":20000},{"2018":20000},{"2019":20000},{"2020":20000},{"2021":20000},{"2022":30000},{"2023":40000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-total-populations',
      valueString:
        '[{"2007":40000},{"2008":40000},{"2009":40000},{"2010":40000},{"2011":40000},{"2012":40000},{"2013":40000},{"2014":40000},{"2015":40000},{"2016":40000},{"2017":40000},{"2018":40000},{"2019":40000},{"2020":40000},{"2021":40000},{"2022":60000},{"2023":80000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-crude-birth-rates',
      valueString:
        '[{"2007":10},{"2008":10},{"2009":10},{"2010":10},{"2011":10},{"2012":10},{"2013":10},{"2014":10},{"2015":10},{"2016":10},{"2017":10},{"2018":10},{"2019":10},{"2020":10},{"2021":10},{"2022":15},{"2023":20}]'
    }
  ],
  meta: {
    lastUpdated: '2023-11-22T12:15:05.122+00:00',
    versionId: '39745e77-c524-4f12-b393-4ae1e03d756e'
  },
  id: 'f71b029f-fa53-45a9-8ed3-4b79f6e20c96'
})

export const districtMockOfState = JSON.stringify({
  resourceType: 'Location',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/statistical-code',
      value: 'ADMIN_STRUCTURE_oEBf29y8JP8'
    },
    {
      system: 'http://opencrvs.org/specs/id/jurisdiction-type',
      value: 'DISTRICT'
    }
  ],
  name: 'Ibombo',
  alias: ['Ibombo'],
  description: 'oEBf29y8JP8',
  status: 'active',
  mode: 'instance',
  partOf: {
    reference: 'Location/f71b029f-fa53-45a9-8ed3-4b79f6e20c96'
  },
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/location-type',
        code: 'ADMIN_STRUCTURE'
      }
    ]
  },
  physicalType: {
    coding: [
      {
        code: 'jdn',
        display: 'Jurisdiction'
      }
    ]
  },
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/location-boundary-geojson',
      valueAttachment: {
        contentType: 'application/geo+json',
        data: '<base64>'
      }
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-male-populations',
      valueString:
        '[{"2007":5000},{"2008":5000},{"2009":5000},{"2010":5000},{"2011":5000},{"2012":5000},{"2013":5000},{"2014":5000},{"2015":5000},{"2016":5000},{"2017":5000},{"2018":5000},{"2019":5000},{"2020":5000},{"2021":5000},{"2022":7500},{"2023":10000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-female-populations',
      valueString:
        '[{"2007":5000},{"2008":5000},{"2009":5000},{"2010":5000},{"2011":5000},{"2012":5000},{"2013":5000},{"2014":5000},{"2015":5000},{"2016":5000},{"2017":5000},{"2018":5000},{"2019":5000},{"2020":5000},{"2021":5000},{"2022":7500},{"2023":10000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-total-populations',
      valueString:
        '[{"2007":10000},{"2008":10000},{"2009":10000},{"2010":10000},{"2011":10000},{"2012":10000},{"2013":10000},{"2014":10000},{"2015":10000},{"2016":10000},{"2017":10000},{"2018":10000},{"2019":10000},{"2020":10000},{"2021":10000},{"2022":15000},{"2023":20000}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-crude-birth-rates',
      valueString:
        '[{"2007":10},{"2008":10},{"2009":10},{"2010":10},{"2011":10},{"2012":10},{"2013":10},{"2014":10},{"2015":10},{"2016":10},{"2017":10},{"2018":10},{"2019":10},{"2020":10},{"2021":10},{"2022":15},{"2023":20}]'
    }
  ],
  meta: {
    lastUpdated: '2023-11-22T12:15:05.118+00:00',
    versionId: 'b16c3805-ea38-468c-8031-23d6323583d8'
  },
  id: '59198c8d-ece1-46c2-9cee-1cd6ae078b25'
})

export const officeMockOfDistrict = JSON.stringify({
  resourceType: 'Location',
  identifier: [
    {
      system: 'http://opencrvs.org/specs/id/internal-id',
      value: 'CRVS_OFFICE_JWMRGwDBXK'
    }
  ],
  name: 'Ibombo District Office',
  alias: ['Ibombo District Office'],
  status: 'active',
  mode: 'instance',
  partOf: {
    reference: 'Location/59198c8d-ece1-46c2-9cee-1cd6ae078b25'
  },
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/location-type',
        code: 'CRVS_OFFICE'
      }
    ]
  },
  physicalType: {
    coding: [
      {
        code: 'bu',
        display: 'Building'
      }
    ]
  },
  meta: {
    lastUpdated: '2023-11-22T12:15:05.119+00:00',
    versionId: 'baf90709-d589-47f1-bb9e-7631e76a4ab8'
  },
  id: 'd4ea52d2-0da7-4f40-8073-cf29fd0685c0'
})

export const practitionerRoleMock = JSON.stringify({
  resourceType: 'Bundle',
  id: '1d4c5877-abab-4e7b-9eca-49bbd6d50c0f',
  meta: {
    lastUpdated: '2023-11-23T11:09:02.340+00:00'
  },
  type: 'searchset',
  total: 1,
  link: [
    {
      relation: 'self',
      url: 'http://localhost:3447/fhir/PractitionerRole?practitioner=5e530833-956a-4f98-af57-6edb315fe6bb'
    }
  ],
  entry: [
    {
      fullUrl:
        'http://localhost:3447/fhir/PractitionerRole/3aec06d1-90e8-4a8f-aaef-8de22875a0ee/_history/8d386f4f-6dce-4365-9f53-f817f27c97ed',
      resource: {
        resourceType: 'PractitionerRole',
        practitioner: {
          reference: 'Practitioner/5e530833-956a-4f98-af57-6edb315fe6bb'
        },
        code: [
          {
            coding: [
              {
                system: 'http://opencrvs.org/specs/roles',
                code: 'LOCAL_REGISTRAR'
              }
            ]
          },
          {
            coding: [
              {
                system: 'http://opencrvs.org/specs/types',
                code: '[{"lang":"en","label":"Local Registrar"},{"lang":"fr","label":"Registraire local"}]'
              }
            ]
          }
        ],
        location: [
          {
            reference: 'Location/d4ea52d2-0da7-4f40-8073-cf29fd0685c0'
          },
          {
            reference: 'Location/59198c8d-ece1-46c2-9cee-1cd6ae078b25'
          },
          {
            reference: 'Location/f71b029f-fa53-45a9-8ed3-4b79f6e20c96'
          }
        ],
        meta: {
          lastUpdated: '2023-11-22T12:15:05.121+00:00',
          versionId: '8d386f4f-6dce-4365-9f53-f817f27c97ed'
        },
        id: '3aec06d1-90e8-4a8f-aaef-8de22875a0ee'
      },
      request: {
        method: 'PUT',
        url: 'PractitionerRole/3aec06d1-90e8-4a8f-aaef-8de22875a0ee'
      }
    }
  ]
})

export const registrarMock = JSON.stringify({
  resourceType: 'Practitioner',
  identifier: [],
  telecom: [
    {
      system: 'phone',
      value: '0933333333'
    },
    {
      system: 'email',
      value: ''
    }
  ],
  name: [
    {
      use: 'en',
      family: 'Mweene',
      given: ['Kennedy']
    }
  ],
  meta: {
    lastUpdated: '2023-11-22T12:15:05.116+00:00',
    versionId: 'fc468c8c-85c5-4833-95d9-75223f6c756a'
  },
  _request: {
    method: 'PUT'
  },
  id: '5e530833-956a-4f98-af57-6edb315fe6bb'
})

export const informantSMSNotificationMock = [
  {
    _id: '63a30240ee4b270dc91f53d0',
    name: 'birthInProgressSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d1',
    name: 'birthDeclarationSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d2',
    name: 'birthRegistrationSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d3',
    name: 'birthRejectionSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d4',
    name: 'deathInProgressSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d5',
    name: 'deathDeclarationSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d6',
    name: 'deathRegistrationSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  },
  {
    _id: '63a30240ee4b270dc91f53d7',
    name: 'deathRejectionSMS',
    enabled: true,
    createdAt: 1671627328205,
    updatedAt: 1671627328205
  }
]

export const compositionMock = JSON.stringify({
  identifier: {
    system: 'urn:ietf:rfc:3986',
    value: 'B5JUNQO'
  },
  resourceType: 'Composition',
  status: 'preliminary',
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/doc-types',
        code: 'birth-declaration'
      }
    ],
    text: 'Birth Declaration'
  },
  class: {
    coding: [
      {
        system: 'http://opencrvs.org/doc-classes',
        code: 'crvs-document'
      }
    ],
    text: 'CRVS Document'
  },
  title: 'Birth Declaration',
  section: [
    {
      title: 'Child details',
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/doc-sections',
            code: 'child-details'
          }
        ],
        text: 'Child details'
      },
      entry: [
        {
          reference: 'Patient/58efd5d1-d07f-4bac-af8e-771be81db047'
        }
      ]
    },
    {
      title: "Mother's details",
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/doc-sections',
            code: 'mother-details'
          }
        ],
        text: "Mother's details"
      },
      entry: [
        {
          reference: 'Patient/0477b181-9e79-4f41-ac5b-54cdf3a4ca9d'
        }
      ]
    },
    {
      title: 'Birth Encounter',
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/sections',
            code: 'birth-encounter'
          }
        ],
        text: 'Birth encounter'
      },
      entry: [
        {
          reference: 'Encounter/a6ace176-f6fe-404d-9bed-236e1ce50b93'
        }
      ]
    }
  ],
  subject: {},
  date: '2019-02-06T11:24:04.264Z',
  author: [],
  meta: {
    lastUpdated: '2019-02-06T11:24:06.089+00:00',
    versionId: '7b6d3f45-f607-4f40-adc5-3a5a958882f9'
  },
  _request: {
    method: 'POST'
  },
  id: '95035079-ec2c-451c-b514-664e838e8a5b'
})

export const deathCompositionMock = JSON.stringify({
  identifier: {
    system: 'urn:ietf:rfc:3986',
    value: '98df1315-47fd-4fc8-a505-9439ad7c6778'
  },
  resourceType: 'Composition',
  status: 'preliminary',
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/doc-types',
        code: 'death-declaration'
      }
    ],
    text: 'Death Declaration'
  },
  class: {
    coding: [
      { system: 'http://opencrvs.org/doc-classes', code: 'crvs-document' }
    ],
    text: 'CRVS Document'
  },
  title: 'Death Declaration',
  section: [
    {
      title: 'Deceased details',
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/doc-sections',
            code: 'deceased-details'
          }
        ],
        text: 'Deceased details'
      },
      entry: [{ reference: 'urn:uuid:186f02ab-e039-4924-9cd0-32d61797e624' }]
    },
    {
      title: "Informant's details",
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/doc-sections',
            code: 'informant-details'
          }
        ],
        text: "Informant's details"
      },
      entry: [{ reference: 'urn:uuid:43b3d0b4-2749-4494-a15d-2ad6051217bc' }]
    },
    {
      title: 'Death encounter',
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/sections',
            code: 'death-encounter'
          }
        ],
        text: 'Death encounter'
      },
      entry: [{ reference: 'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' }]
    }
  ],
  subject: {},
  date: '2019-02-11',
  author: []
})

export const patientMock = JSON.stringify({
  resourceType: 'Patient',
  active: true,
  id: '1c9add9b-9215-49d7-bfaa-226c82ac47d1',
  name: [
    {
      use: 'bn',
      family: ['লদলদসসসস']
    },
    {
      use: 'en',
      family: ['ttttttt']
    }
  ],
  gender: 'male',
  birthDate: '2020-07-01',
  multipleBirthInteger: 1
})

export const motherMock = JSON.stringify({
  resourceType: 'Patient',
  active: true,
  identifier: [
    {
      id: '12341234123412341',
      type: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/identifier-type',
            code: 'NATIONAL_ID'
          }
        ]
      }
    }
  ],
  name: [
    {
      use: 'bn',
      family: ['নাম্বারো']
    }
  ],
  telecom: [
    {
      system: 'phone',
      value: '01711111111'
    }
  ],
  maritalStatus: {
    coding: [
      {
        system: 'http://hl7.org/fhir/StructureDefinition/marital-status',
        code: 'M'
      }
    ],
    text: 'MARRIED'
  },
  multipleBirthInteger: 1,
  address: [
    {
      type: 'PRIMARY_ADDRESS',
      line: ['', '', '', '', '', 'ee72f497-343f-4f0f-9062-d618fafc175c'],
      district: 'c879ce5c-545b-4042-98a6-77015b0e13df',
      state: '9a236522-0c3d-40eb-83ad-e8567518c763',
      country: 'BGD'
    },
    {
      type: 'SECONDARY_ADDRESS',
      line: ['', '', '', '', '', 'ee72f497-343f-4f0f-9062-d618fafc175c'],
      district: 'c879ce5c-545b-4042-98a6-77015b0e13df',
      state: '9a236522-0c3d-40eb-83ad-e8567518c763',
      country: 'BGD'
    }
  ],
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
      extension: [
        {
          url: 'code',
          valueCodeableConcept: {
            coding: [
              {
                system: 'urn:iso:std:iso:3166',
                code: 'BGD'
              }
            ]
          }
        },
        {
          url: 'period',
          valuePeriod: {
            start: '',
            end: ''
          }
        }
      ]
    }
  ],
  _transforms: {
    matching: {
      name: {
        family: [['', '']]
      }
    }
  },
  meta: {
    lastUpdated: '2019-02-06T11:24:06.097+00:00',
    versionId: '66791cd4-2867-4414-bb3e-9d411038c3df'
  },
  _request: {
    method: 'POST'
  },
  id: '0477b181-9e79-4f41-ac5b-54cdf3a4ca9d'
})

export const testDeathFhirBundle: Bundle<
  Composition | Patient | RelatedPerson | Encounter | Observation | Task
> = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: 'urn:uuid:98df1315-47fd-4fc8-a505-9439ad7c6778' as URNReference,
      resource: {
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '98df1315-47fd-4fc8-a505-9439ad7c6778'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'death-declaration'
            }
          ],
          text: 'Death Declaration'
        },
        class: {
          coding: [
            { system: 'http://opencrvs.org/doc-classes', code: 'crvs-document' }
          ],
          text: 'CRVS Document'
        },
        title: 'Death Declaration',
        section: [
          {
            title: 'Deceased details',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'deceased-details'
                }
              ],
              text: 'Deceased details'
            },
            entry: [
              {
                reference:
                  'urn:uuid:186f02ab-e039-4924-9cd0-32d61797e624' as URNReference
              }
            ]
          },
          {
            title: "Informant's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'informant-details'
                }
              ],
              text: "Informant's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:43b3d0b4-2749-4494-a15d-2ad6051217bc' as URNReference
              }
            ]
          },
          {
            title: 'Death encounter',
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/specs/sections',
                  code: 'death-encounter'
                }
              ],
              text: 'Death encounter'
            },
            entry: [
              {
                reference:
                  'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
              }
            ]
          }
        ],
        subject: {},
        date: '2019-02-11',
        author: []
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9' as URNReference,
      resource: deathTaskMock as Task
    },
    {
      fullUrl: 'urn:uuid:186f02ab-e039-4924-9cd0-32d61797e624' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,

        name: [{ use: 'en', given: ['Jane'], family: ['Doe'] }],
        gender: 'female',
        birthDate: '2000-01-28',
        maritalStatus: {
          coding: [
            {
              system: 'http://hl7.org/fhir/StructureDefinition/marital-status',
              code: 'M'
            }
          ],
          text: 'MARRIED'
        },
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/date-of-marriage',
            valueDateTime: '2014-01-28'
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
            extension: [
              {
                url: 'code',
                valueCodeableConcept: {
                  coding: [{ system: 'urn:iso:std:iso:3166', code: 'BGD' }]
                }
              },
              { url: 'period', valuePeriod: { start: '', end: '' } }
            ]
          },
          {
            url: 'http://opencrvs.org/specs/extension/educational-attainment',
            valueString: 'UPPER_SECONDARY_ISCED_3'
          }
        ],
        multipleBirthInteger: 1,
        deceasedBoolean: true,
        deceasedDateTime: '2014-01-28'
      }
    },
    {
      fullUrl: 'urn:uuid:43b3d0b4-2749-4494-a15d-2ad6051217bc' as URNReference,
      resource: {
        resourceType: 'RelatedPerson',
        relationship: {
          coding: [
            {
              system:
                'http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype',
              code: 'OTHER'
            }
          ],
          text: 'Nephew'
        },
        patient: {
          reference:
            'urn:uuid:030b5690-c5c9-4dc5-a55d-045c2f9b9bd7' as URNReference
        }
      }
    },
    {
      fullUrl: 'urn:uuid:030b5690-c5c9-4dc5-a55d-045c2f9b9bd7' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [{ use: 'en', given: ['John'], family: ['Doe'] }],
        telecom: [{ system: 'phone', value: '0171111111', use: 'mobile' }],
        gender: 'male',
        birthDate: '2000-01-28',
        maritalStatus: {
          coding: [
            {
              system: 'http://hl7.org/fhir/StructureDefinition/marital-status',
              code: 'M'
            }
          ],
          text: 'MARRIED'
        },
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/date-of-marriage',
            valueDateTime: '2014-01-28'
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
            extension: [
              {
                url: 'code',
                valueCodeableConcept: {
                  coding: [{ system: 'urn:iso:std:iso:3166', code: 'BGD' }]
                }
              },
              { url: 'period', valuePeriod: { start: '', end: '' } }
            ]
          },
          {
            url: 'http://opencrvs.org/specs/extension/educational-attainment',
            valueString: 'UPPER_SECONDARY_ISCED_3'
          }
        ],
        multipleBirthInteger: 1,
        address: [
          {
            use: 'home',
            type: 'SECONDARY_ADDRESS',
            line: ['2760 Mlosi Street', 'Wallacedene'],
            city: 'Cape Town',
            district: 'Kraaifontein',
            state: 'Western Cape',
            postalCode: '7570',
            country: 'BGD'
          },
          {
            use: 'home',
            type: 'PRIMARY_ADDRESS',
            text: 'Optional address text',
            line: ['40 Orbis Wharf', 'Wallacedene'],
            city: 'Cape Town',
            district: 'Kraaifontein',
            state: 'Western Cape',
            postalCode: '7570',
            country: 'BGD'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference,
      resource: {
        resourceType: 'Encounter',
        status: 'finished',
        location: [
          {
            location: { reference: 'Location/123' as ResourceIdentifier }
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:fff280db-e146-40bf-a53d-850bb7972f0e' as URNReference,
      resource: {
        resourceType: 'Observation',

        status: 'final',
        context: {
          reference:
            'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
        },
        category: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/observation-category',
                code: 'procedure',
                display: 'Procedure'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'health-facility-death',
              display: 'Health facility death location'
            }
          ]
        },
        valueString: 'Location/123'
      }
    },
    {
      fullUrl: 'urn:uuid:dc488e79-0cf9-4fa1-b9d0-3dd142d01d03' as URNReference,
      resource: {
        resourceType: 'Observation',
        status: 'final',
        context: {
          reference:
            'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
        },
        category: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/observation-category',
                code: 'procedure',
                display: 'Procedure'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'death-location-type',
              display: 'Type of death location'
            }
          ]
        },
        valueString: 'PRIVATE_HOME'
      }
    },
    {
      fullUrl: 'urn:uuid:eb58c885-606b-46ef-9a44-c06a8d073ced' as URNReference,
      resource: {
        resourceType: 'Observation',
        status: 'final',
        context: {
          reference:
            'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
        },
        category: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/observation-category',
                code: 'vital-signs',
                display: 'Vital Signs'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'uncertified-manner-of-death',
              display: 'Uncertified manner of death'
            }
          ]
        },
        valueCodeableConcept: {
          coding: [
            {
              system: 'http://hl7.org/fhir/ValueSet/icd-10',
              code: 'NATURAL_CAUSES'
            }
          ]
        }
      }
    },
    {
      fullUrl: 'urn:uuid:04b79f83-779c-4a33-a1c9-714ea0b1d020' as URNReference,
      resource: {
        resourceType: 'Observation',
        status: 'final',
        context: {
          reference:
            'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
        },
        category: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/observation-category',
                code: 'vital-signs',
                display: 'Vital Signs'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'cause-of-death-method',
              display: 'Cause of death method'
            }
          ]
        },
        valueCodeableConcept: {
          coding: [
            {
              system: 'http://hl7.org/fhir/ValueSet/icd-10',
              code: 'MEDICALLY_CERTIFIED'
            }
          ]
        }
      }
    },
    {
      fullUrl: 'urn:uuid:e01d0427-d219-41b3-8452-f23def5b824f' as URNReference,
      resource: {
        resourceType: 'Observation',
        status: 'final',
        context: {
          reference:
            'urn:uuid:a2e4fe6a-5a9d-4113-8da7-5618d27f1c0a' as URNReference
        },
        category: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/observation-category',
                code: 'vital-signs',
                display: 'Vital Signs'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'ICD10',
              display: 'Cause of death'
            }
          ]
        },
        valueCodeableConcept: {
          coding: [
            { system: 'http://hl7.org/fhir/ValueSet/icd-10', code: 'age' }
          ]
        }
      }
    }
  ],
  meta: { lastUpdated: '2019-02-11' }
}

export const testMarriageFhirBundle: Bundle<Task | Composition | Patient> = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: {
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '0ab5e4cd-a49b-4bf3-b03a-08b2e65e642a'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'marriage-declaration'
            }
          ],
          text: 'Marriage Declaration'
        },
        class: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-classes',
              code: 'crvs-document'
            }
          ],
          text: 'CRVS Document'
        },
        subject: {},
        date: '2018-05-23T14:44:58+02:00',
        author: [],
        title: 'Marriage Declaration',
        section: [
          {
            title: "Groom's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'groom-details'
                }
              ],
              text: "Groom's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference
              }
            ]
          },
          {
            title: "Bride's details",
            code: {
              coding: [
                {
                  system: 'http://opencrvs.org/doc-sections',
                  code: 'bride-details'
                }
              ],
              text: "Bride's details"
            },
            entry: [
              {
                reference:
                  'urn:uuid:ab392b88-1861-44e8-b5b0-f6e0525b2662' as URNReference
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9' as URNReference,
      resource: {
        resourceType: 'Task',
        status: 'ready',
        intent: 'order',
        focus: {
          reference: 'urn:uuid:888' as URNReference
        },
        extension: [],
        encounter: {
          reference: 'urn:uuid:888' as URNReference
        },
        lastModified: '2018-05-23T14:44:58+02:00',
        businessStatus: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/reg-status',
              code: 'IN_PROGRESS'
            }
          ]
        },
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'MARRIAGE'
            }
          ]
        },
        identifier: [
          {
            system: 'http://opencrvs.org/specs/id/paper-form-id',
            value: '12345678'
          },
          {
            system: 'http://opencrvs.org/specs/id/marriage-tracking-id',
            value: 'MYEHHN3' as TrackingID
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jane'],
            family: ['Doe'],
            use: 'en'
          }
        ],
        gender: 'female',
        telecom: [
          {
            system: 'phone',
            value: '+8801622688231'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:b9044443-c708-4977-b0e7-7e51ef0c9221' as URNReference,
      resource: {
        resourceType: 'Patient',
        active: true,
        name: [
          {
            given: ['Jack'],
            family: ['Doe'],
            use: 'en'
          }
        ],
        gender: 'male'
      }
    }
  ]
}

export const testInProgressFhirBundle = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: {
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '0ab5e4cd-a49b-4bf3-b03a-08b2e65e642a'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'birth-declaration'
            }
          ],
          text: 'Birth Declaration'
        },
        class: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-classes',
              code: 'crvs-document'
            }
          ],
          text: 'CRVS Document'
        },
        subject: {},
        date: '2018-05-23T14:44:58+02:00',
        author: [],
        title: 'Birth Declaration',
        section: []
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9',
      resource: {
        resourceType: 'Task',
        status: 'draft',
        intent: '',
        focus: {
          reference: 'urn:uuid:888' as URNReference
        },
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'birth-registration'
            }
          ]
        },
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          },
          {
            url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
            valueString: '+8801622688231'
          }
        ]
      }
    }
  ]
}

export const testInProgressDeathFhirBundle = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: 'urn:uuid:98df1315-47fd-4fc8-a505-9439ad7c6778',
      resource: {
        identifier: {
          system: 'urn:ietf:rfc:3986',
          value: '98df1315-47fd-4fc8-a505-9439ad7c6778'
        },
        resourceType: 'Composition',
        status: 'preliminary',
        type: {
          coding: [
            {
              system: 'http://opencrvs.org/doc-types',
              code: 'death-declaration'
            }
          ],
          text: 'Death Declaration'
        },
        class: {
          coding: [
            { system: 'http://opencrvs.org/doc-classes', code: 'crvs-document' }
          ],
          text: 'CRVS Document'
        },
        title: 'Death Declaration',
        section: [],
        subject: {},
        date: '2019-02-11',
        author: []
      }
    },
    {
      fullUrl: 'urn:uuid:104ad8fd-e7b8-4e3e-8193-abc2c473f2c9',
      resource: {
        resourceType: 'Task',
        status: 'draft',
        intent: '',
        focus: {
          reference: 'urn:uuid:888' as URNReference
        },
        code: {
          coding: [
            {
              system: 'http://opencrvs.org/specs/types',
              code: 'death-registration'
            }
          ]
        },
        extension: [
          {
            url: 'http://opencrvs.org/specs/extension/contact-person',
            valueString: 'MOTHER'
          },
          {
            url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
            valueString: '+8801622688231'
          }
        ]
      }
    }
  ],
  meta: { lastUpdated: '2019-02-11' }
}

export const hearthResponseMock = JSON.stringify({
  resourceType: 'Bundle',
  entry: [
    {
      response: {
        status: '200',
        location:
          '/fhir/Composition/d10947db-51e1-4f47-a5e1-3f9d1b58eee8/_history/2a70a1cd-fd08-4eab-a134-39769e34d41e'
      }
    },
    {
      response: {
        status: '200',
        location:
          '/fhir/Encounter/d3b9f408-a16a-42c2-9cfe-53ad2fbfda99/_history/e927451f-e19f-40dd-be7b-5b6c50c26d9d'
      }
    },
    {
      response: {
        status: '200',
        location:
          '/fhir/Observation/d617505b-047f-459f-b486-9eb7c3fb0a82/_history/e3264e1a-4a74-45e1-891d-7d27c7eb45a4'
      }
    },
    {
      response: {
        status: '200',
        location:
          '/fhir/Task/fb4a19b4-8f5f-4660-98a5-0a149d1580b3/_history/2482bf54-673a-4d80-a1ce-07c921820efb'
      }
    },
    {
      response: {
        status: '200',
        location:
          '/fhir/Patient/f814a8d6-abd4-4ccd-8ed9-235e0908edfc/_history/e26f454e-f55f-43fb-92c4-25c9d88d5b2a'
      }
    },
    {
      response: {
        status: '200',
        location:
          '/fhir/Patient/5de966c5-cc82-47a4-9676-4ea66285c3be/_history/fb4947b8-f541-4afb-a797-7c859d5a7c33'
      }
    },
    {
      response: {
        status: '201',
        location:
          '/fhir/RelatedPerson/8ca66791-362d-479d-8eb9-13d1929139dc/_history/4a1a9be8-fca4-4b6c-b097-5277c3d15ff3'
      }
    },
    {
      response: {
        status: '201',
        location:
          '/fhir/Location/43f49a50-d8f4-4f30-ba84-6bc7bc181b67/_history/139f61a3-7a3a-4532-8392-7094de3f1d80'
      }
    }
  ],
  type: 'transaction-response'
})

export const userResponseMock = JSON.stringify({
  role: 'FIELD_AGENT',
  scope: []
})

export const relatedPersonMock = JSON.stringify({
  resourceType: 'RelatedPerson',
  relationship: {
    coding: [
      {
        system: 'http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype',
        code: 'OTHER'
      }
    ],
    text: 'Nephew'
  },
  patient: {
    reference: 'urn:uuid:14fc828b-281c-4a2e-a9ef-44d4361fca57' as URNReference
  }
})

export function wrapInBundle(...resources: [fhir3.Resource | string]): string {
  return JSON.stringify({
    resourceType: 'Bundle',
    type: 'document',
    entry: resources.map((resource) => ({
      resource: typeof resource === 'string' ? JSON.parse(resource) : resource
    }))
  })
}

export const mockFormDraft = [
  {
    _id: '623f30a18aef60124a72df14',
    status: 'PUBLISHED',
    event: 'death',
    comment: 'Modified previous death question',
    version: 2,
    createdAt: 1648308385612,
    updatedAt: 1648308396432,
    history: [
      {
        status: 'DRAFT',
        _id: '623f30ac8aef60124a72df1c',
        version: 1,
        comment: 'Added new death question',
        updatedAt: 1648308385612
      }
    ],
    __v: 0
  },
  {
    _id: '623f30c18aef60124a72df28',
    status: 'DRAFT',
    event: 'birth',
    comment: 'Added new birth question',
    version: 1,
    createdAt: 1648308417889,
    updatedAt: 1648308457121,
    history: [],
    __v: 0
  }
]
type PatientIdentifier = NonNullable<Patient['identifier']>[number]

const drnIdentifier = {
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/identifier-type',
        code: 'DEATH_REGISTRATION_NUMBER'
      }
    ]
  },
  value: '2022DSNEYUG'
} satisfies PatientIdentifier

const nidIdentifier = {
  value: '654654666',
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/identifier-type',
        code: 'NATIONAL_ID'
      }
    ]
  }
} satisfies PatientIdentifier

const brnIdentifier = {
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/identifier-type',
        code: 'BIRTH_REGISTRATION_NUMBER'
      }
    ]
  },
  value: '2022BSNEYUG'
} satisfies PatientIdentifier

const mosipPsutTokenIdentifier = {
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/identifier-type',
        code: 'MOSIP_PSUT_TOKEN_ID'
      }
    ]
  },
  value: '257803821990055124230310596669133515'
} as fhir3.CodeableConcept

const birthPatientIdentifier = {
  type: {
    coding: [
      {
        system: 'http://opencrvs.org/specs/identifier-type',
        code: 'BIRTH_PATIENT_ENTRY'
      }
    ]
  },
  value: '1c9add9b-9215-49d7-bfaa-226c82ac47d2'
} as fhir3.CodeableConcept

export const mosipDeceasedPatientMock: Saved<Patient> = {
  resourceType: 'Patient',
  active: true,
  id: '1c9add9b-9215-49d7-bfaa-226c82ac47d1' as UUID,
  name: [
    {
      use: 'en',
      given: ['Sakib Al'],
      family: ['Hasan']
    }
  ],
  gender: 'male',
  deceased: true,
  birthDate: '1990-09-01',
  identifier: [nidIdentifier, drnIdentifier]
}

export const mosipUpdatedDeceasedPatientMock = {
  resourceType: 'Patient',
  active: true,
  id: '1c9add9b-9215-49d7-bfaa-226c82ac47d1',
  name: [
    {
      use: 'en',
      given: ['Sakib Al'],
      family: ['Hasan']
    }
  ],
  gender: 'male',
  deceased: true,
  birthDate: '1990-09-01',
  identifier: [nidIdentifier, drnIdentifier, birthPatientIdentifier]
}

export const mosipBirthPatientMock = {
  resourceType: 'Patient',
  active: true,
  id: '1c9add9b-9215-49d7-bfaa-226c82ac47d2',
  name: [
    {
      use: 'bn',
      given: ['Sakib Al'],
      family: ['Hasan']
    }
  ],
  gender: 'male',
  birthDate: '1990-09-01',
  multipleBirthInteger: 1,
  identifier: [brnIdentifier, mosipPsutTokenIdentifier]
}

export const mosipBirthPatientBundleMock = {
  resourceType: 'Bundle',
  type: 'document',
  entry: [
    {
      fullUrl: `urn:uuid:888` as URNReference,
      resource: mosipBirthPatientMock
    }
  ]
}

export const mosipErrorMock = JSON.stringify({
  transactionID: '6810356436',
  version: '1.0',
  id: 'mosip.identity.auth',
  errors: [
    {
      errorCode: 'IDA-DEA-001',
      errorMessage: 'Demographic data dob did not match',
      actionMessage: 'Please re-enter your dob'
    }
  ],
  responseTime: '2022-08-30T07:52:41.749Z',
  response: {
    authStatus: false,
    authToken: '278978890917620599774520674456334033'
  }
})
export const mosipSuccessMock = {
  transactionID: '5763906453',
  version: '1.0',
  id: 'mosip.identity.auth',
  errors: null,
  responseTime: '2022-08-30T08:15:11.033Z',
  response: {
    authStatus: true,
    authToken: '257803821990055124230310596669133515'
  }
}
export const mosipConfigMock = [
  { status: 'active', name: 'Sweet Health', integratingSystemType: 'MOSIP' }
]
