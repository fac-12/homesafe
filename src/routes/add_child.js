const {formatDate} = require('../validators')
const add_child = require('../queries/add_child')

exports.post = (req, res) =>{
  const child_details = req.body;
  console.log(child_details);
  child_details.school_id = 2;
  child_details.parent_id = req.session.parent_id;
  add_child(child_details).then(()=>{
    req.flash('success', 'Your child has been added.')
    res.redirect('parent_profile')
  }).catch((err)=>{
    throw err;
  })
}
