## Workflow
1. `run "source env.sh" where env.sh contains the codex API key`
2. `run python genENV.py -c [control mode] -d "false" -i [ID]`
3. `run "source participantEnv.sh"`
4. `run "npm start"`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app. An electron window will open.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `python genENV.py -c [control mode: "true"/"false"] -d [development mode: "true"/"false"] -i [User ID]`

This will generate participantEnv.sh that should be sourced before launching the UI.
