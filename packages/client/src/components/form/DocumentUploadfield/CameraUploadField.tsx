/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import {
  ErrorText,
  ImageUploader,
  ISelectOption,
  LeftNavigation,
  Select
} from '@client/../../components/lib'
import {
  PrimaryButton,
  SecondaryButton
} from '@client/../../components/lib/buttons'
import { buttonMessages, formMessages } from '@client/i18n/messages'
import { messages } from '@client/i18n/messages/views/notifications'
import { EMPTY_STRING } from '@client/utils/constants'
import { LoadingIndicator } from '@client/views/OfficeHome/LoadingIndicator'
import React, { ReactNode } from 'react'
import { injectIntl, WrappedComponentProps as IntlShapeProps } from 'react-intl'
import styled from 'styled-components'

const PhotoUploader = styled(SecondaryButton)`
  margin: 8px 0;
`

export const ErrorMessage = styled.div`
  margin-bottom: 16px;
`

const VideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px;
`

const VideoButtonHolder = styled.div`
  padding: 16px 0;
`

const TakePhotoButton = styled(PrimaryButton)`
  margin-right: 16px;
`

const VideoLoadingIndicator = styled(LoadingIndicator)`
  position: absolute;
  left: 50px;
  top: 350px;
  z-index: 2;
  margin: 16px;
`

type IFullProps = {
  isValid: () => boolean
  handleFileChange: (uploadedImage: File) => void
} & IntlShapeProps

type IState = {
  cameraOptions: ISelectOption[]
  selectedCamera: string
  showVideo: boolean
  loadingVideo: boolean
  errorMessage: string
}

class CameraUploadFieldComp extends React.Component<IFullProps, IState> {
  private videoRef: React.RefObject<HTMLVideoElement>
  private stream: MediaStream
  constructor(props: IFullProps) {
    super(props)
    this.stream = new MediaStream()
    this.videoRef = React.createRef()
    this.state = {
      cameraOptions: [],
      selectedCamera: EMPTY_STRING,
      showVideo: false,
      loadingVideo: false,
      errorMessage: EMPTY_STRING
    }
  }

  onCameraChange = (selectedCamera: string) => {
    this.setState({
      selectedCamera: selectedCamera
    })
  }

  startStreaming = async () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        loadingVideo: true
      }
    })
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      let mediaOptions: ISelectOption[] = []
      devices.map((mediaDeviceInfo, index, arr) => {
        if (mediaDeviceInfo.kind === 'videoinput') {
          mediaOptions = mediaOptions.concat({
            value: mediaDeviceInfo.deviceId,
            label: mediaDeviceInfo.label || 'Camera ' + (index + 1)
          })
          this.setState((prevState) => {
            return {
              ...prevState,
              cameraOptions: mediaOptions,
              selectedCamera: mediaOptions[0].value
            }
          })
        }
      })
    })

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: this.state.selectedCamera
        ? { deviceId: this.state.selectedCamera }
        : true
    })
    this.videoRef.current!.srcObject = this.stream
    this.setState((prevState) => {
      return {
        ...prevState,
        showVideo: true,
        loadingVideo: false
      }
    })
  }

  cancel = async () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showVideo: false
      }
    })
    this.stream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  takePhoto = async () => {
    const imageCapture = new (window as any).ImageCapture(
      this.stream.getVideoTracks()[0]
    )

    imageCapture
      .takePhoto()
      .then((blob: Blob) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            imageSource: URL.createObjectURL(blob),
            showVideo: false
          }
        })
        const file = blobToFile(blob, 'some-name.jpg')
        this.props.handleFileChange(file)
      })
      .catch(() => {
        this.setState((prevState) => {
          return {
            ...prevState,
            showVideo: false,
            errorMessage: this.props.intl.formatMessage(
              messages.imageCaptureFailed
            )
          }
        })
        throw Error(this.props.intl.formatMessage(messages.imageCaptureFailed))
      })
      .finally(() => {
        this.stream.getTracks().forEach((track) => {
          track.stop()
        })
      })
  }

  render(): ReactNode {
    const { intl } = this.props
    return (
      <div>
        <PhotoUploader
          id="upload_photo"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
            if (this.props.isValid()) {
              this.startStreaming()
            }
          }}
        >
          {intl.formatMessage(formMessages.openCamera)}
        </PhotoUploader>
        <ErrorMessage id="upload-error">
          {this.state.errorMessage && (
            <ErrorText>{this.state.errorMessage}</ErrorText>
          )}
        </ErrorMessage>
        <VideoOverlay
          style={{ display: this.state.showVideo ? 'block' : 'none' }}
        >
          {this.state.loadingVideo && <VideoLoadingIndicator loading={true} />}
          <video
            autoPlay
            playsInline
            ref={this.videoRef}
            style={{ width: '100%', height: '70%' }}
          ></video>
          <Select
            id="camera-source"
            options={this.state.cameraOptions}
            onChange={this.onCameraChange}
            value={this.state.selectedCamera}
          />
          <VideoButtonHolder>
            <TakePhotoButton
              id="take_photo"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.takePhoto()
              }}
            >
              {intl.formatMessage(formMessages.takePhoto)}
            </TakePhotoButton>
            <SecondaryButton
              id="cancel_photo"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.cancel()
              }}
            >
              {intl.formatMessage(buttonMessages.cancel)}
            </SecondaryButton>
          </VideoButtonHolder>
        </VideoOverlay>
      </div>
    )
  }
}

export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type: blob.type
  })
}

export const CameraUploadField = injectIntl<'intl', IFullProps>(
  CameraUploadFieldComp
)