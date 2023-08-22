import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)

  // ✨ where are my props? Destructure them here

  useEffect(() => {
    if(props.currentArticleId) {
      setValues({
        title: props.currentArticleId.title,
        text: props.currentArticleId.text,
        topic: props.currentArticleId.topic,
      })
    }
    else{
      setValues(initialFormValues)
    }
    
  
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
   },[props.currentArticleId])
   
  


  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    //console.log('title',evt.target[0].value)
    //console.log('text',evt.target[1].value)
    // console.log('topic',evt.target[2].value)
    //console.log(props.currentArticleId.article_id)
    if (props.currentArticleId) {
      //props.updateArticle(props.currentArticleId, article )
      props.updateArticle({article_id: props.currentArticleId.article_id, article: values })
    } else {
     
      props.postArticle(values);
    }
    setValues(initialFormValues);
  
  

    //evt.preventDefault()
    //props.postArticle(values)
    //setValues(initialFormValues)
    
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  }

  const isDisabled = () => {
    if(values.title.trim().length >= 1 || values.text.trim().length >= 1){
      //&& values.topic === "React" || values.topic === "JavaScript" || values.topic === "Node"
     return false
    }else{
      return true
    }
    //The title and text length must be >= 1, after trimming
    //The topic needs to be one of three values: React, JavaScript, Node
    // ✨ implement
    // Make sure the inputs have some values
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{!props.currentArticle ? 'Create Article': 'Edit'}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={Function.prototype}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
