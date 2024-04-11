## Overview

This repository contains the data and code for the paper [Do Users Write More Insecure Code With AI Assistants?](https://arxiv.org/pdf/2211.03622.pdf) by Neil Perry*, Megha Srivastava*, Deepak Kumar, and Dan Boneh, and published in ACM CCS 2023. In this work, we build a user study interface to help investigate whether open access to an AI Assistant (based on OpenAI's codex-davinci-002 model) causes users to be more likely to introduce security vulnerabilities in their code. For any questions, please contact naperry@stanford.edu and megha@cs.stanford.edu! 

If you find this repository useful, please cite:

```
@inproceedings{perry2023ai,
    title = "Do Users Write More Insecure Code With AI Assistants?",
    author = "Perry, Neil and Srivastava, Megha and Kumar, Deepak, and Boneh, Dab",
    booktitle = "ACM Computer and Communications Security",
    year = "2023",
}
```

## Interface Workflow
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
