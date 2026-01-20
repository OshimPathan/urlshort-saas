import { Router } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import User from '../models/User.js';
import { signJwt, setAuthCookie } from '../utils/jwt.js';

const router = Router();

// Passport serialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              passwordHash: 'oauth_' + Math.random().toString(36)
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = signJwt({ id: req.user._id, email: req.user.email, plan: req.user.plan });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  });
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/github/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName || profile.username,
              passwordHash: 'oauth_' + Math.random().toString(36)
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
  router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
    const token = signJwt({ id: req.user._id, email: req.user.email, plan: req.user.plan });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  });
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              email,
              name: `${profile.name.givenName} ${profile.name.familyName}`,
              passwordHash: 'oauth_' + Math.random().toString(36)
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = signJwt({ id: req.user._id, email: req.user.email, plan: req.user.plan });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  });
}

// Twitter Strategy
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/twitter/callback`,
        includeEmail: true
      },
      async (token, tokenSecret, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@twitter.com`;
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName,
              passwordHash: 'oauth_' + Math.random().toString(36)
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  router.get('/twitter', passport.authenticate('twitter'));
  router.get('/twitter/callback', passport.authenticate('twitter', { session: false }), (req, res) => {
    const token = signJwt({ id: req.user._id, email: req.user.email, plan: req.user.plan });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  });
}

// LinkedIn Strategy
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/linkedin/callback`,
        scope: ['r_emailaddress', 'r_liteprofile']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.id}@linkedin.com`;
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName,
              passwordHash: 'oauth_' + Math.random().toString(36)
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  router.get('/linkedin', passport.authenticate('linkedin'));
  router.get('/linkedin/callback', passport.authenticate('linkedin', { session: false }), (req, res) => {
    const token = signJwt({ id: req.user._id, email: req.user.email, plan: req.user.plan });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  });
}

export default router;
