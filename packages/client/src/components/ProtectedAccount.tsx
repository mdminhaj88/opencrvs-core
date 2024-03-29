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
import React, { useState } from 'react'
import { UserSetupPage } from '@client/views/UserSetup/UserSetupPage'
import { CreatePassword } from '@client/views/UserSetup/CreatePassword'
import { SecurityQuestion } from '@client/views/UserSetup/SecurityQuestionView'
import { UserSetupReview } from '@client/views/UserSetup/SetupReviewPage'
import { SetupConfirmationPage } from '@client/views/UserSetup/SetupConfirmationPage'

export enum ProtectedAccoutStep {
  LANDING,
  PASSWORD,
  SECURITY_QUESTION,
  REVIEW,
  CONFIRMATION
}
export interface ISecurityQuestionAnswer {
  questionKey: string
  answer: string
}
export interface IProtectedAccountSetupData {
  userId?: string
  password?: string
  securityQuestionAnswers?: ISecurityQuestionAnswer[]
}

export const ProtectedAccount = () => {
  const [currentStep, setCurrentStep] = useState<ProtectedAccoutStep>(
    ProtectedAccoutStep.LANDING
  )
  const [setupData, setSetupData] = useState<IProtectedAccountSetupData>({})

  const goToStep = (
    step: ProtectedAccoutStep,
    data: IProtectedAccountSetupData
  ) => {
    setCurrentStep(step)
    setSetupData(data)
  }

  switch (currentStep) {
    case ProtectedAccoutStep.LANDING:
      return <UserSetupPage goToStep={goToStep} setupData={setupData} />
    case ProtectedAccoutStep.PASSWORD:
      return <CreatePassword goToStep={goToStep} setupData={setupData} />
    case ProtectedAccoutStep.SECURITY_QUESTION:
      return <SecurityQuestion goToStep={goToStep} setupData={setupData} />
    case ProtectedAccoutStep.REVIEW:
      return <UserSetupReview goToStep={goToStep} setupData={setupData} />
    case ProtectedAccoutStep.CONFIRMATION:
      return <SetupConfirmationPage />
    default:
      return null
  }
}
