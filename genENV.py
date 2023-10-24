import argparse
import sys
import os
import random

def main():

    # parse args
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--Control", type=str, help="true for control group, false for experiment group")
    parser.add_argument("-d", "--Dev", type=str, help="true to display developer console, false to not display developer console")
    parser.add_argument("-i", "--ID", type=str, help="participant ID number")

    args = parser.parse_args()

    # create random question order
    questions = ["1", "2", "3", "4", "5", "6"]
    random.shuffle(questions)
    order = ','.join(questions)

    with open("./participantEnv.sh", "w") as env:
        # Writing data to a file
        env.write('export \"OPENAI_API_KEY\"=\"' + os.environ['OPENAI_API_KEY'] + '\"\n')
        env.write('export \"CONTROL\"=\"' + args.Control + '\"\n')
        env.write('export \"DEV\"=\"' + args.Dev + '\"\n')
        env.write('export \"ID\"=\"' + args.ID + '\"\n')
        env.write('export \"QUESTION_ORDER\"=\"' + order + '\"\n')

if __name__ == "__main__":
    main()
