import User from "../model/userModel.js";
import Agent from "../model/agentModel.js";
import PolicyCarrier from "../model/policyCarrierModel.js";
import PolicyCategory from "../model/policyCategoryModel.js";
import PolicyInfo from "../model/policyInfoModel.js";
import UsersAccount from "../model/usersAccountModel.js";

class UserHelpers {
  // Add user
  async addUser(data) {
    const response = await User.findOneAndUpdate(
      { first_name: data?.first_name },
      {
        $setOnInsert: {
          first_name: data.first_name,
          dob: data?.dob,
          address: data?.address,
          phone: data?.phone,
          state: data?.state,
          zip: data?.zip,
          email: data?.email,
          gender: data?.gender,
          user_type: data?.userType,
        },
      },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Add agent
  async addAgent(agent) {
    const response = await Agent.findOneAndUpdate(
      { agent },
      { $setOnInsert: { agent } },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Add carrier
  async addCarrier(company_name) {
    const response = await PolicyCarrier.findOneAndUpdate(
      { company_name },
      { $setOnInsert: { company_name } },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Add category
  async addCategory(category_name) {
    const response = await PolicyCategory.findOneAndUpdate(
      { category_name },
      { $setOnInsert: { category_name } },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Add account name
  async addAccountName(account_name) {
    const response = await UsersAccount.findOneAndUpdate(
      { account_name },
      { $setOnInsert: { account_name } },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Add policy
  async addPolicy(data, ids) {
    const response = await PolicyInfo.findOneAndUpdate(
      { policy_number: data?.policy_number },
      {
        $setOnInsert: {
          policy_number: data.policy_number,
          policy_type: data?.policy_type,
          producer: data?.producer,
          csr: data?.csr,
          premium_amount: data?.premium_amount,
          policy_start_date: data?.policy_start_date,
          policy_end_date: data?.policy_end_date,
          user_id: ids[0],
          agent_id: ids[1],
          carrier_id: ids[2],
          category_id: ids[3],
          account_name_id: ids[4],
        },
      },
      { upsert: true, new: true }
    );
    if (response) return response._id;
  }

  // Get user name
  async getUserName(userName) {
    const regex = new RegExp(userName, "i");
    return await UsersAccount.find(
      { account_name: { $regex: regex } },
      { account_name: 1 }
    );
  }

  // Get user policy
  async getUserPolicy(userName) {
    return await UsersAccount.aggregate([
      {
        $match: {
          account_name: userName,
        },
      },
      {
        $lookup: {
          from: "policyinfo",
          localField: "_id",
          foreignField: "account_name_id",
          as: "policyResult",
        },
      },
      {
        $unwind: {
          path: "$policyResult",
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "policyResult.agent_id",
          foreignField: "_id",
          as: "agentResult",
        },
      },
      {
        $lookup: {
          from: "policycarriers",
          localField: "policyResult.carrier_id",
          foreignField: "_id",
          as: "carrierResult",
        },
      },
      {
        $lookup: {
          from: "policycategories",
          localField: "policyResult.category_id",
          foreignField: "_id",
          as: "categoryResult",
        },
      },
      {
        $unwind: {
          path: "$categoryResult",
        },
      },
      {
        $unwind: {
          path: "$agentResult",
        },
      },
      {
        $unwind: {
          path: "$carrierResult",
        },
      },
      {
        $project: {
          _id: "$policyResult._id",
          account_name: 1,
          agent_name: "$agentResult.agent",
          company_name: "$carrierResult.company_name",
          category_name: "$categoryResult.category_name",
          policy_number: "$policyResult.policy_number",
          policy_type: "$policyResult.policy_type",
          producer: "$policyResult.producer",
          csr: "$policyResult.csr",
          premium_amount: "$policyResult.premium_amount",
          policy_start_date: "$policyResult.policy_start_date",
          policy_end_date: "$policyResult.policy_end_date",
          category_name: "$policyResult.category_name",
          createdAt: "$policyResult.createdAt",
          updatedAt: "$policyResult.updatedAt",
        },
      },
    ]);
  }

  async getUserPolicies() {
    return await PolicyInfo.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userResult",
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "agent_id",
          foreignField: "_id",
          as: "agentResult",
        },
      },
      {
        $lookup: {
          from: "policycarriers",
          localField: "carrier_id",
          foreignField: "_id",
          as: "carrierResult",
        },
      },
      {
        $lookup: {
          from: "policycategories",
          localField: "category_id",
          foreignField: "_id",
          as: "categoryResult",
        },
      },
      {
        $lookup: {
          from: "usersaccounts",
          localField: "account_name_id",
          foreignField: "_id",
          as: "accountNameResult",
        },
      },
      {
        $unwind: {
          path: "$userResult",
        },
      },
      {
        $unwind: {
          path: "$agentResult",
        },
      },
      {
        $unwind: {
          path: "$carrierResult",
        },
      },
      {
        $unwind: {
          path: "$categoryResult",
        },
      },
      {
        $unwind: {
          path: "$accountNameResult",
        },
      },
      {
        $project: {
          _id: "$accountNameResult._id",
          first_name: "$userResult.first_name",
          dob: "$userResult.dob",
          address: "$userResult.address",
          phone: "$userResult.phone",
          state: "$userResult.state",
          zip: "$userResult.zip",
          email: "$userResult.email",
          gender: "$userResult.gender",
          policy_number: 1,
          policy_type: 1,
          producer: 1,
          csr: 1,
          agent: "$agentResult.agent",
          company_name: "$carrierResult.company_name",
          category_name: "$categoryResult.category_name",
          premium_amount: 1,
          policy_start_date: 1,
          policy_end_date: 1,
          createdAt: 1,
          updatedAt: 1,
          account_name: "$accountNameResult.account_name",
        },
      },
      {
        $group: {
          _id: "$_id",
          account_name: {
            $first: "$account_name",
          },
          policies: {
            $push: {
              _id: "$_id",
              first_name: "$first_name",
              dob: "$dob",
              address: "$address",
              phone: "$phone",
              state: "$state",
              zip: "$zip",
              email: "$email",
              gender: "$gender",
              policy_number: "$policy_number",
              policy_type: "$policy_type",
              producer: "$producer",
              csr: "$csr",
              agent: "$agent",
              company_name: "$company_name",
              premium_amount: "$premium_amount",
              policy_start_date: "$policy_start_date",
              policy_end_date: "$policy_end_date",
              category_name: "$category_name",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
    ]);
  }
}

export default new UserHelpers();
