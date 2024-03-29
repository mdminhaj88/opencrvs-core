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
import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake'
import { transformers } from '@client/pdfRenderer/transformer'
import {
  IPDFTemplate,
  ISVGTemplate,
  OptionalData
} from '@client/pdfRenderer/transformer/types'
import { IntlShape } from 'react-intl'
import { IDeclaration } from '@client/declarations'
import { IOfflineData } from '@client/offline/reducer'
import { isMobileDevice } from '@client/utils/commonUtils'
import { UserDetails } from '@client/utils/userUtils'

/*
  Converts template definition into actual PDF using defined transformers, declarationData and userDetails
*/
export function createPDF(
  template: IPDFTemplate,
  declaration: IDeclaration,
  userDetails: UserDetails,
  offlineResource: IOfflineData,
  intl: IntlShape,
  optionalData?: OptionalData
): TCreatedPdf {
  pdfMake.vfs = { ...template.vfs }
  let definitionString = JSON.stringify(template.definition)
  if (template.transformers && template.transformers.length > 0) {
    template.transformers.forEach((transformerDef) => {
      const transformFunction = transformers[transformerDef.operation]
      if (!transformFunction) {
        throw new Error(
          `No transform function found for given name: ${transformerDef.operation}`
        )
      }
      let result = transformFunction(
        { declaration, userDetails, resource: offlineResource },
        intl,
        transformerDef.parameters,
        optionalData
      )
      if (
        typeof transformerDef.valueIndex !== 'undefined' && // Checking type of the object as it can contain 0
        typeof result === 'string'
      ) {
        result = (result as string).charAt(transformerDef.valueIndex) || ''
      }
      definitionString = definitionString.replace(
        new RegExp(`{${transformerDef.field}}`, 'gi'),
        result || ''
      )
    })
  }
  return pdfMake.createPdf(
    JSON.parse(definitionString),
    undefined,
    template.fonts
  )
}
/*
  Converts template definition into actual SVG using defined transformers, declarationData and userDetails
*/

export function createSVG(
  template: ISVGTemplate,
  declaration: IDeclaration,
  userDetails: UserDetails,
  offlineResource: IOfflineData,
  intl: IntlShape,
  optionalData?: OptionalData
): string {
  pdfMake.vfs = { ...template.vfs }
  let definitionString = JSON.stringify(template.definition)
  if (template.transformers && template.transformers.length > 0) {
    template.transformers.forEach((transformerDef) => {
      const transformFunction = transformers[transformerDef.operation]
      if (!transformFunction) {
        throw new Error(
          `No transform function found for given name: ${transformerDef.operation}`
        )
      }
      let result = transformFunction(
        { declaration, userDetails, resource: offlineResource },
        intl,
        transformerDef.parameters,
        optionalData
      )
      if (
        typeof transformerDef.valueIndex !== 'undefined' && // Checking type of the object as it can contain 0
        typeof result === 'string'
      ) {
        result = (result as string).charAt(transformerDef.valueIndex) || ''
      }
      definitionString = definitionString.replace(
        new RegExp(`{${transformerDef.field}}`, 'gi'),
        result || ''
      )
    })
  }
  return JSON.parse(definitionString)
}

export function printPDF(
  template: IPDFTemplate,
  declaration: IDeclaration,
  userDetails: UserDetails,
  offlineResource: IOfflineData,
  intl: IntlShape,
  optionalData?: OptionalData
) {
  const pdf = createPDF(
    template,
    declaration,
    userDetails,
    offlineResource,
    intl,
    optionalData
  )
  if (isMobileDevice()) {
    pdf.download(`${declaration.id}`)
  } else {
    pdf.print()
  }
}
