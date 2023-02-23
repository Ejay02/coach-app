export default {
  async registerCoach(ctx, data) {
    const userId = ctx.rootGetters.userId;
    const coachData = {
      // id: ctx.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const res = await fetch(
      `https://coach-app-db-default-rtdb.firebaseio.com/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const resData = await res.json();

    if (!res.ok) {
      // const error = new Error(resData.message || 'Failed to fetch');
      // throw error;
      // err
    }

    ctx.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(ctx, payload) {
    if (!payload.forceRefresh && !ctx.getters.shouldUpdate) {
      return;
    }
    const res = await fetch(
      `https://coach-app-db-default-rtdb.firebaseio.com/coaches.json`
    );
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch');
      throw error;
    }
    const coaches = [];

    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas,
      };

      coaches.push(coach);
    }
    ctx.commit('setCoaches', coaches);
    ctx.commit('setFetchTimestamp');
  },
};
