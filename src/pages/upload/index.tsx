/* eslint-disable no-console */
import React, { useCallback, useEffect } from 'react'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'

import { useFiles } from '@/context/files'
import { useAuth } from '@/context/auth'

import Table from '@/components/Table'

import { Container, Content } from '@/containers/MainContainer/style'

import { DropContainer, UploadMessage } from './style'

export default function Upload() {
  const { handleUpload, loadUserFiles } = useFiles()
  const { user } = useAuth()

  useEffect(() => user && loadUserFiles(user.id), [])

  const onDrop = useCallback(
    (files) => {
      if (user) handleUpload(files, user.id)
    },
    [handleUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Drag your beautiful file over here...</UploadMessage>
    }

    return <UploadMessage type="success">Let it fall over here!</UploadMessage>
  }, [isDragActive])

  return (
    <Container>
      <Head>
        <title>Magicul Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <DropContainer {...getRootProps()}>
          <input {...getInputProps()} />
          {renderDragMessage()}
        </DropContainer>
        <Table />
      </Content>
    </Container>
  )
}