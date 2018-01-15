const parent_child_da_id = require('../queries/parent_child_da_id')

exports.post = (req, res) => {
//  console.log(req.body);
  const schedule_details = req.body;
  // console.log(parent_child_da_id(req.session.parent_id, schedule_details.child_name, schedule_details.da_name));
   parent_child_da_id(req.session.parent_id, schedule_details.child_name, schedule_details.da_name).then((queryRes)=>{
  //  console.log(queryRes);
    return queryRes;
  })

}
