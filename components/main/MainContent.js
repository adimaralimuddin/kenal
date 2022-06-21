
import React from 'react'
import PostAdder from '../post/PostAdder'
import Posts from '../post/Posts'
import StoryMain from '../story/StoryMain'
import SuggestionMain from '../suggestions/SuggestionMain'

export default function MainContent() {
  return (
    <div className='flex max-w-5xld mx-auto justify-center p-2'>
      <div className='flex-1 max-w-md'>
        <StoryMain/>
        <PostAdder />
        <Posts/>
      </div>
      <div className='pl-4'>
          <SuggestionMain/>

      </div>
    </div>
  )
}
