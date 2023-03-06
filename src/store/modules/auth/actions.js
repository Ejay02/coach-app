let timer;

export default {
  async login(ctx, payload) {
    return ctx.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(ctx, payload) {
    return ctx.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(ctx, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHWONv9Uscm4yTPqf9x7C6pMb30tP15aY`;

    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHWONv9Uscm4yTPqf9x7C6pMb30tP15aY`;
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate');
      throw error;
    }

    const expIn = +resData.expIn * 1000;

    const expDate = new Date().getTime + expIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpiration', expDate);

    timer = setTimeout(function () {
      ctx.dispatch('autoLogout');
    }, expIn);

    ctx.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
    });
  },

  tryLogin(ctx) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expIn = +tokenExpiration - new Date().getTime();

    if (expIn < 0) {
      return;
    }
    timer = setTimeout(function () {
      ctx.dispatch('autoLogout');
    }, expIn);

    if (token && userId) {
      ctx.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },

  logout(ctx) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    ctx.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(ctx) {
    ctx.dispatch('logout');
    ctx.commit('setAutoLogout');
  },
};
