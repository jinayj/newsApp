import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      
     <div>
        <div className="card" style={{width : "18rem"}}>
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
  <img src={imageUrl} className="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p class="card-text"><small class="text-muted">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
     </div>
      
    )
  }
}

export default NewsItem