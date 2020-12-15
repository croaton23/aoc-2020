#include <iostream>
#include <fstream>
#include <string>
#include <unordered_map>

using namespace std;

int main() {

    // 14.1
    string str;
    ifstream file("../input/14.txt");
    string mask;
    const int size = 1000000;
    uint64_t mem[size];
    for(int i = 0; i < size;i++)
         mem[i] = 0;

    while (std::getline(file, str))
    {
        if (str[1] == 'a')
            mask = str.substr(7, str.size() - 7);
        else {
            int index1 = str.find('[');
            int index2 = str.find(']');
            int index = stoi(str.substr(index1 + 1, index2 - index1 - 1));
            int b = str.find_last_of(' ');
            uint64_t value = stoi(str.substr(b + 1, str.size() - b - 1));
            
            mem[index] = 0;
            for(uint64_t i = 0; i < 36; ++i) {
                mem[index] = (mask[i] == 'X') 
                    ? mem[index] | (value & ((uint64_t)1 << (35-i)))
                    : mem[index] | (((uint64_t)(mask[i] - '0')) << (35-i));
            }
        }
    }  

    int64_t sum = 0;
    for(int i = 0; i < size; i++)
        sum += mem[i];

    cout << sum << endl;
    file.close();
    
    // 14.2
    ifstream file1("../input/14.txt");
    std::unordered_map<uint64_t, uint64_t> bigMem;

    while (std::getline(file1, str))
    {
        if (str[1] == 'a')
            mask = str.substr(7, str.size() - 7);
        else {
            int index1 = str.find('[');
            int index2 = str.find(']');
            int index = stoi(str.substr(index1 + 1, index2 - index1 - 1));
            int b = str.find_last_of(' ');
            uint64_t value = stoi(str.substr(b + 1, str.size() - b - 1));
            
            string address(36, '#');
            int xAmount = 0;
            for(int i = 0; i < 36; ++i) {
                if (mask[i] == 'X'){
                    address[i] = 'X';
                    xAmount++;
                }
                if (mask[i] == '1')
                    address[i] = '1';
                if (mask[i] == '0')
                    address[i] = (char)( ( (((uint64_t)index) >> (35-i)) & 1) + '0');
            }

            for(int i = 0; i < (1 << xAmount); ++i)
            {
                string copy(address);
                for(int j = 0; j < xAmount; ++j)
                {
                    int k = 0;
                    while (copy[k] != 'X') k++;
                    copy[k] = (char)(((i >> j) & 1) + '0');
                }

                int64_t sum = 0;
                for(int k = 0; k < 36; k++)
                    sum += ( (int64_t)(copy[k]-'0') << (35-k) );
                
                bigMem[sum] = value;
            }

        }
    }  

    sum = 0;
    for( const auto& item : bigMem )
        sum += item.second;

    cout << sum << endl;

    return 0;
}