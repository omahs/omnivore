import Link from 'next/link'
import { HStack, SpanBox, VStack } from './LayoutPrimitives'
import { ArrowRightIcon } from './icons/ArrowRightIcon'
import { theme } from '../tokens/stitches.config'
import { ReactNode } from 'react'
import { Button } from './Button'
import { CloseIcon } from './images/CloseIcon'

type SuggestionBoxProps = {
  helpMessage: string
  helpCTAText: string | undefined
  helpTarget: string | undefined

  size?: 'large' | 'small'
  background?: string

  dismissible?: boolean
  onDismiss?: () => void
}

type InternalOrExternalLinkProps = {
  link: string
  children: ReactNode
}

const InternalOrExternalLink = (props: InternalOrExternalLinkProps) => {
  const isExternal = props.link.startsWith('https')

  return (
    <SpanBox
      css={{
        cursor: 'pointer',
        a: {
          color: '$omnivoreCtaYellow',
        },
      }}
    >
      {!isExternal ? (
        <Link href={props.link}>{props.children}</Link>
      ) : (
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      )}
    </SpanBox>
  )
}

export const SuggestionBox = (props: SuggestionBoxProps) => {
  return (
    <HStack
      css={{
        gap: '10px',
        display: 'flex',
        flexDirection: props.size == 'large' ? 'column' : 'row',
        width: 'fit-content',
        borderRadius: '5px',
        background: props.background ?? '$thBackground3',
        fontSize: '15px',
        fontFamily: '$inter',
        fontWeight: '500',
        color: '$thTextContrast',
        py: '10px',
        px: '15px',
        justifyContent: 'flex-start',
        '@smDown': {
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        },
      }}
    >
      <VStack>
        {props.dismissible && (
          <SpanBox
            css={{
              marginLeft: 'auto',
            }}
          >
            <Button
              style="plainIcon"
              css={{
                fontSize: '10',
                fontWeight: '600',
              }}
            >
              Dismiss
            </Button>
          </SpanBox>
        )}
        {props.helpMessage}
        {props.helpTarget && (
          <InternalOrExternalLink link={props.helpTarget}>
            <SpanBox
              css={{
                display: 'flex',
                alignItems: 'center',
                color: '$omnivoreCtaYellow',
                gap: '2px',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <>{props.helpCTAText}</>
              <ArrowRightIcon
                size={25}
                color={theme.colors.omnivoreCtaYellow.toString()}
              />
            </SpanBox>
          </InternalOrExternalLink>
        )}
      </VStack>
    </HStack>
  )
}
