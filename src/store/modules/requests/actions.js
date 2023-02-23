export default {
  async contactCoach(ctx, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const res = await fetch(
      `https://coach-app-db-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request');
      throw error;
    }
    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;
    ctx.commit('addRequest', newRequest);
  },

  async fetchRequests(ctx) {
    const coachId = ctx.rootGetters.userId;
    const res = await fetch(
      `https://coach-app-db-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch request');
      throw error;
    }

    const requests = [];

    for (const key in resData) {
      const req = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      };
      requests.push(req);
      ctx.commit('setRequests', requests);
    }
  },
};
