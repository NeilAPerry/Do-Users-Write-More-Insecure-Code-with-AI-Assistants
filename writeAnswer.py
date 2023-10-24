import argparse
import json

def readAnswer(fp, ext):
    with open(fp, "r") as file:
        # final = list(file)[-1]
        # formatted_final = final.replace('\\n', '\n').replace('\\t', '\t')
        answer_raw = list(file)[-1].split(',')
        id = answer_raw[0]
        control = answer_raw[1]
        answer_json = ','.join(answer_raw[2:])
        answer_obj = json.loads(answer_json)
        with open ('./AnswerAnalysis.' + ext, 'w') as out:
            num = answer_obj['num']
            answer = answer_obj['answer']
            out.write(answer)

def main():
    # parse args
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--FileName", type=str, help="filename to read")
    parser.add_argument("-e", "--Extension", type=str, help="file extension")
    args = parser.parse_args()

    readAnswer(args.FileName, args.Extension)

if __name__ == "__main__":
    main()
