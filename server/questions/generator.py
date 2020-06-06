#!/usr/bin/python3

api_ret = callApi()
if [ condition 1 ]: 
    echo "What is the " + api_ret["stadium"] + "of " + api_ret["club"] + "?"
elif [ condition 2 ]:
    echo "How many " + api_ret["stat"] + "has " + api_ret["player_name"] + "scored"?
    etc.
