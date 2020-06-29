from .write_html import write_html

def main():
  write_html(data_file = 'procedures.json', output_file = 'chart.html')



if __name__ == "__main__":
    main()
