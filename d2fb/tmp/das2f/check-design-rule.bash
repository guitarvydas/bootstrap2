
# # Design Rule - all ports (ellipses) must have a direction
# echo '** design rule for layer 2 **'
# ./design_rule_layer2  1>&2

dr=$root/dr
mdfile=${dr}/dr-edgecontainment.md
fname=`basename -s '.md' $mdfile`
temp=temp_${RANDOM}

${das2fdir}/a-${fname} | ${das2fdir}/b-${fname} 2> $temp

#./check-errors.bash
if grep -q failure <$temp
then
    echo
    cat $temp 1>&2
    echo quitting 1>&2
    rm $temp
    exit 1
fi
rm $temp
