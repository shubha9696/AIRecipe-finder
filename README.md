# AI Recipe Finder - Vercel Deployment Guide

This guide will help you deploy the AI Recipe Finder application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your project (GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Push your code to a Git repository**
   - Make sure all your changes are committed and pushed to your repository

2. **Import your project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository
   - Vercel will automatically detect the project settings

3. **Configure Environment Variables**
   - In the Vercel deployment interface, go to the "Environment Variables" section
   - Add the following environment variable:
     - `OPENAI_API_KEY`: Your OpenAI API key (from OpenRouter)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

## Project Structure

The project is configured for Vercel deployment with:

- `vercel.json`: Defines build settings and routing
- Frontend: React application built with Vite
- Backend: Express API with OpenAI integration

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs for errors
2. Verify that your environment variables are correctly set
3. Make sure your OpenAI API key is valid

## Local Development

To run the project locally:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

To start the production server:

```bash
npm start
```